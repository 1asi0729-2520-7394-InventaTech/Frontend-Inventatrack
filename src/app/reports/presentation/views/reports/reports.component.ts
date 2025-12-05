import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {ReportsStore} from '../../../application/reports.store';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  private store = inject(ReportsStore);

  expiredProducts = this.store.expiredProducts;
  expiringSoonProducts = this.store.expiringSoonProducts;
  lowStockProducts = this.store.lowStockProducts;
  isLoading = this.store.isLoading;

  ngOnInit(){
    this.store.loadReports();
  }

  exportPDF() {
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
