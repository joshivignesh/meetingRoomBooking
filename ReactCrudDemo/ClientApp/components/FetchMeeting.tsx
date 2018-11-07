import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchMeetingDataState {
    mtgList: MeetingData[];
    loading: boolean;
}

export class FetchMeeting extends React.Component<RouteComponentProps<{}>, FetchMeetingDataState> {
    constructor() {
        super();
        this.state = { mtgList: [], loading: true };

        fetch('api/Meeting/Index')
            .then(response => response.json() as Promise<MeetingData[]>)
            .then(data => {
                this.setState({ mtgList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderMeetingTable(this.state.mtgList);

        return <div>
            <h1>Meeting Data</h1>
            <p>This component demonstrates fetching Meeting data from the server.</p>
            <p>
                <Link to="/addMeeting">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for a Meeting
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete Meeting with Id: " + id))
            return;
        else {
            fetch('api/Meeting/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        mtgList: this.state.mtgList.filter((rec) => {
                            return (rec.meetingID!= id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
         this.props.history.push("/meeting/edit/" + id);
        // this.props.history.push("/fetchmeeting");
    }

    // Returns the HTML table to the render() method.
    private renderMeetingTable(mtgList: MeetingData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>MeetingId</th>
                    <th>Name</th>
                    <th>MeetingStartDate</th>
                    <th>MeetingEndDate</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {mtgList.map(mtg =>
                    <tr key={mtg.meetingID}>
                        <td></td>
                        <td>{mtg.meetingID}</td>
                        <td>{mtg.meetingName}</td>
                        <td>{mtg.meetingStartDate}</td>
                        <td>{mtg.meetingendDate}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(mtg.meetingID)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(mtg.meetingID)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class MeetingData {
    meetingID: number = 0;
    meetingName: string = "";
    meetingStartDate: Date = new Date();
    meetingendDate: Date = new Date();
} 

export function getDate (a: Date) {
    return a.getFullYear() + "/" + a.getDate() + "/" + a.getMonth();
}