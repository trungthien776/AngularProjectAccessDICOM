import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { InstanceModel } from "./InstanceModel";
@Injectable()
export class InstanceService{
    private instance:InstanceModel[];
    public arr=[];
    constructor(private http: Http) {
    
    }
    
    getData(seriesID) {
        let baseurl = 'http://localhost:4000/series/' + seriesID + '/instances';
        this.http.get(baseurl)
        .map((res: Response) => (
                res.json() //Convert response to JSON
            ))
        .subscribe(data => { console.log(data) })
    }

    
    GetList(seriesID){
        let baseurl = 'http://localhost:4000/series/' + seriesID + '/instances';
        return this.http.get(baseurl).toPromise()
            .then(this.ExtractData)
            .catch(this.HandleError);
        
    }
    private ExtractData(res: Response) {
        let series = res.json();
        let instanceModel = [];
        for (let temp of series) {
            let isntsModel =
                temp.ID
            instanceModel.push(isntsModel);
        }
        // console.log(instanceModel);
        return instanceModel;
    }
    private HandleError(err: Response | any) {
        return Promise.reject(err.message || err);
    }

   
}