import { Component } from '@angular/core';
import { QueryService } from '../query-service.service';
import { DataTablesModule } from 'angular-datatables';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import 'datatables.net';
import 'datatables.net-dt';
import { ngxCsv } from 'ngx-csv/ngx-csv';
declare const $: any;

@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule],
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent {
  query: string = '';
  // searchQuery: string = '';
  result: any[] = [];
  columns: string[] = [];
  query_error: string | null = null;
  isLoading: boolean = false;
  page: number = 1;
  size: number = 10;
  totalPages: number = 0;
  totalItems: number = 0;
  currentEntries: number = 0;
  travell:String='';

  constructor(private queryService: QueryService) {}

  executeQuery() {
    this.isLoading = true;
    this.result = [];
    this.columns = [];
    if ($.fn.dataTable.isDataTable('#table')) {
      $('#table').DataTable().destroy();
    }

    this.queryService.executeQuery(this.query, this.page, this.size).subscribe({
      next: (data: any) => {
        this.query_error = '';
        this.result = data.data.map((row:any) =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, value === null || value === '' ? 'null' : value])
          )
        );
        this.columns = Array.from(new Set(data.data.flatMap(Object.keys)));
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
        this.currentEntries = this.result.length;
        this.renderDataTable();
      },
      error: (error: any) => {
        this.isLoading = false;
        this.result = [];
        this.columns = [];
        console.error('Error executing query', error);
        this.query_error = error.error ? error.error : 'Error executing query';
      },
      complete: () => {
        this.isLoading = false;
        this.query_error = null;
        console.info('Query execution complete');
      }
    });
  }

  showdata() {
    $(document).ready(() => {
      $('#table').DataTable({
        columns: this.columns.map(col => ({ title: col, data: col })),
        data: this.result,
        scrollY: "400px",
        // paging: false,
        // searching: false,
        // info: false,
      });
    });
  }

  renderDataTable(): void {
    setTimeout(() => this.showdata(), 100);
  }

  downloadCSV() {
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: false,
      useBom: true,
      noDownload: false,
    };
    new ngxCsv(this.result, "Data", options);
  }

  goToPage(page: number) {
    this.page = page;
    this.executeQuery();
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.travell=' next '
      this.executeQuery();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.travell=' previous '
      this.executeQuery();
    }
  }

  // search() {
  //   this.page = 1; // Reset to the first page on new search
  //   this.executeQuery();
  // }
}