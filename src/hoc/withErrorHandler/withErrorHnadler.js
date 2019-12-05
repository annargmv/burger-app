import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        constructor (props) {
            super(props);
            this.requestInter = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            })
            this.responseInter = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        }

        componentWillUnmount() {
            console.log("will unmount")
            axios.interceptors.request.eject(this.requestInter);
            axios.interceptors.request.eject(this.responseInter);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }
        render() {
            return (
                <Aux>
                    <Modal 
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;