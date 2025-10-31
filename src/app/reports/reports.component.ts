import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsService, Product } from './reports.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  lowQuantityProducts: Product[] = [];
  expiringSoonProducts: Product[] = [];
  expiringIn14DaysProducts: Product[] = [];
  expiredProducts: Product[] = [];
  loading = true;

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.loadReports();
  }

  private isExpired(date: string): boolean {
    const today = new Date();
    today.setHours(0,0,0,0);
    const expiration = new Date(date);
    expiration.setHours(0,0,0,0);
    return expiration < today;
  }

  private isNearExpiration(date: string, days: number = 7): boolean {
    const today = new Date();
    today.setHours(0,0,0,0);
    const expiration = new Date(date);
    expiration.setHours(0,0,0,0);
    const diffDays = (expiration.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return diffDays > 0 && diffDays <= days;
  }

  loadReports(): void {
    this.loading = true;

    this.reportsService.getLowStockProducts().subscribe(data => {
      this.lowQuantityProducts = data.filter(p => !this.isExpired(p.expirationDate));
    });

    this.reportsService.getExpiringProducts().subscribe(data => {
      this.expiringSoonProducts = data.filter(p => !this.isExpired(p.expirationDate));
    });

    this.reportsService.getExpiringIn14Days().subscribe(data => {
      this.expiringIn14DaysProducts = data.filter(p => !this.isExpired(p.expirationDate));
    });

    this.reportsService.getExpiredProducts().subscribe(data => {
      this.expiredProducts = data.filter(p => this.isExpired(p.expirationDate));
      this.loading = false;
    });
  }

  exportPDF(): void {
    const data = document.getElementById('report-section');
    if (!data) return;

    html2canvas(data).then(canvas => {
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const contentDataURL = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save('reporte-inventario.pdf');
    });
  }
}
