import { Component, inject } from '@angular/core';
import { QueryService } from '../query-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import 'datatables.net';
import 'datatables.net-dt';
import { ngxCsv } from 'ngx-csv/ngx-csv';

import { RouterModule } from '@angular/router';
declare const $: any;

@Component({
  selector: 'app-query-form',
  standalone: true,
  imports: [CommonModule, FormsModule, DataTablesModule, RouterModule],
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css']
})
export class QueryFormComponent {
  query: string = '';
  
  result: any[] = [];
  columns: string[] = [];
  query_error: string | null = null;
  isLoading: boolean = false;  // Loading state variable

  constructor(private queryService: QueryService) { }

  executeQuery() {
    this.isLoading = true; // Start loading
    this.result = [];
    this.columns = [];
    $('table').DataTable().destroy();

    this.queryService.executeQuery(this.query).subscribe({
      next: (data: any[]) => {
        this.query_error='';
        this.result = data.map(row =>
          Object.fromEntries(
            Object.entries(row).map(([key, value]) => [key, value === null || value === '' ? 'null' : value])
          )
        );
        this.columns = Array.from(new Set(data.flatMap(Object.keys)));
        this.renderDataTable();
      },
      error: (error:any) => {
        this.isLoading = false;
        this.result = [];
        this.columns = [];
        console.error('Error executing query', error);
        // this.query_error = 'Error Query in execution: ' + error.error;
        if (error.error && typeof error.error === 'string') {
          this.query_error = error.error;
        }
        else if(error.error &&  error.message){
          if(this.query===''){
            this.query_error="Please Enter the Query";
          }
          else{
            this.query_error="404 Error";
          }
          
        }
      },
      complete: () => {
        this.isLoading = false; // Stop loading
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
        scrollY: "10%",
      });
    });
  }

  renderDataTable(): void {
    if ($.fn.dataTable.isDataTable('#table')) {
      $('#table').DataTable().clear().destroy();
    }
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
}
