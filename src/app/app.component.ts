import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'welcome MyAppCalculator Tutorial';
  displayedColumns: string[] = ['Name', 'experiance', 'skill', 'id', 'Action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit(): void {
    this.getAllCandidate();
  }
  openDialog() {
    this.dialog.open(DialogComponent, {

    }).afterClosed().subscribe(val=>{
      if(val==='save')
      {
        this.getAllCandidate();
      }
    })
  }
  getAllCandidate() {
    
    this.api.getCandidate().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (err) => {
        alert("error while fetching the records")
      }
    })

  }
  editCandidate(row: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data:row
  }).afterClosed().subscribe(val=>{
    if(val==='update'){
      this.getAllCandidate();
    }
  })
  }
  deleteCandidate(id:number){
this.api.deleteCandidate(id)
.subscribe({
  next:(res)=>{
    alert("canidate deleted");
    this.getAllCandidate();
  },
  error:()=>{
    alert("error while deleting the records");
  }
})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
