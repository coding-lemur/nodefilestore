import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/action-creators';
import UploadForm from './upload-form';

function mapStateToProps(state) {
    return {
        files: state.files
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(UploadForm);

export default Main;
