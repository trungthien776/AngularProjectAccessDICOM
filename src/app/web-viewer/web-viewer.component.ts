import { Component, OnInit } from '@angular/core';
import { CornerstoneService } from "./web-viewer.service";
import { ActivatedRoute, ParamMap } from '@angular/router';
import { InstanceService } from "./Instances.service";
import { InstanceModel } from "./InstanceModel";
import { PromiseObservable } from 'rxjs/observable/PromiseObservable';
import { Http } from '@angular/http';

@Component({
  selector: 'app-web-viewer',
  templateUrl: './web-viewer.component.html',
  styleUrls: ['./web-viewer.component.css'],
  providers: [CornerstoneService,
    InstanceService
  ]
})
export class WebViewerComponent implements OnInit {
  imageData: any;
  imageHeaders: Array<string>;
  private seriesID;
  public list = ["f0200ea6-f87841f7-bc747be9-499fb06d-e3b50a6c",
    "6a863e98-22664ba2-5d119098-55e3e3ee-4cdbcd58",
    "f0b9f0ab-110181f8-ce83a1a2-4d8eb2c9-0b682503",
    "9b41ef96-b4031ffc-b1b7ea5d-8a38d55d-fe804601",] ;
  public x;
  public listInstances:Promise<any[]>;
  constructor(public csS: CornerstoneService, 
    public instanceService: InstanceService, 
    private route: ActivatedRoute,
    private http:Http,
  ) {
    
  }
  
  getSeriesID(){
    let id;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
      this.seriesID = id;
    });
  }
  HandleInstance(seriesID) {
    let baseurl = 'http://localhost:8042/series/' + seriesID + '/instances';
    return this.http.get(baseurl).toPromise()
      .then(this.ExtractData)
      .catch(this.HandleError);
  }
  private ExtractData(res) {
    let series = res.json();
    let instanceModel = [];
    for (let temp of series) {
      let isntsModel =
        temp.ID
      instanceModel.push(isntsModel);
    }
    //console.log(instanceModel);
    return instanceModel;
  }
  private HandleError(err: Response | any) {
    return Promise.reject(err.message || err);
  }
  ngOnInit() {
    var a:any[];
    this.getSeriesID();
    console.log('id cua seri la:'+ this.seriesID);
    this.HandleInstance(this.seriesID);
    this.listInstances=this.HandleInstance(this.seriesID);
   
    console.log();
    
    //một promise hứa trã về một array sau đó truy xuất phần tử trong array 
    // để request lên máy chủ orthanc
    this.RequestServer(this.list);
    
  }
  
  
  RequestServer(array:Array<string>){
    for (var i in array) {
      this.csS.fetchDicomImage('http://localhost:8042/instances/' + array[i] + '/file')
        .subscribe(res => this.imageData = res);
    }
  }
  updateHeaders(headerData: Array<string>) {
    this.imageHeaders = headerData;
  }
  onClickMe(){
    console.log('clcikfwfre');
  }
}
