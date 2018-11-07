import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

//import * as Datetime from "react-datetime";
import { MeetingData } from './FetchMeeting';
//import Moment = require('moment');
//import { Moment } from 'moment';
import * as moment from 'moment';



interface AddMeetingDataState {
    title: string;
    loading: boolean;
    mtgData: MeetingData;
}

//////var getDate = function (a: Date) {
//////    return a.getFullYear() + "/" + a.getDate() + "/" + a.getMonth();

//////};

 

export class AddMeeting extends React.Component<RouteComponentProps<{}>, AddMeetingDataState> {
    constructor(props) {
        super(props);

        

        ////// this.state = { title: "", loading: true, cityList: [], mtgData: new EmployeeData };
        this.state = { title: "", loading: true,  mtgData: new MeetingData };

        //////fetch('api/Employee/GetCityList')
        //////    .then(response => response.json() as Promise<Array<any>>)
        //////    .then(data => {
        //////        this.setState({ cityList: data });
        //////    });

        var mtgid = this.props.match.params["mtgid"];

        // This will set state for Edit meeting
        if (mtgid > 0) {
            fetch('api/Meeting/Details/' + mtgid)
                .then(response => response.json() as Promise<MeetingData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, mtgData: data });
                });
        }

        // This will set state for Add employee
        else {
            this.state = { title: "Create", loading: false,  mtgData: new MeetingData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm();

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Meeting</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // PUT request for Edit employee.
        if (this.state.mtgData.meetingID) {
            fetch('api/Meeting/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchmeeting");
                })
        }

        // POST request for Add employee.
        else {
            fetch('api/Meeting/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchmeeting");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchmeeting");
    }

  

    // Returns the HTML Form to the render() method.
    private renderCreateForm() {
       
        return (
           
            <form onSubmit={this.handleSave} >
                
                <div className="form-group row" >
                    <input type="hidden" name="MeetingID" value={this.state.mtgData.meetingID} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="MeetingName" defaultValue={this.state.mtgData.meetingName} required />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="MeetingStartDate">MeetingStartDate</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="meetingstartdate" defaultValue={moment(this.state.mtgData.meetingStartDate).format('MM-DD-YYYY')} required  />
 


                        
                        
                      
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="MeetingEndDate">MeetingEndDate</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="meetingenddate" defaultValue={moment(this.state.mtgData.meetingendDate).format('MM-DD-YYYY')} required />
                       
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }

     
}