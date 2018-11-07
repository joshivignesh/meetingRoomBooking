import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class LoginForm extends React.Component<RouteComponentProps<{}>> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <h3>Sign in</h3>
                <input type="text" ref="username" placeholder="enter you username" />
                <input type="password" ref="password" placeholder="enter password" />
                <input type="submit" value="Login" />
            </div>
        </div>;
    }
}
