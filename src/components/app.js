import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actionCreators from '../actions/action-creators';
import MainLayout from './main-layout';

function mapStateToProps(state) {
    return {
        files: state.files
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

const App = connect(mapStateToProps, mapDispatchToProps)(MainLayout);

export default App;
