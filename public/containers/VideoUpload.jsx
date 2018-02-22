import React from "react";
import Dropzone from "react-dropzone";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import { uploadVideo } from "../actions/videos.js";
import { CODE_SUCCESS, CODE_FAILURE } from "../actions/constants.js";

const mapStateToProps = state => ({video: state.videos});
const mapDispatchToProps = dispatch => ({uploadVideo: formData => dispatch(uploadVideo(formData))});

class ConnectedVideoUpload extends React.Component {

    constructor(props) {
	super(props);
	this.state = {
	    file: undefined,
	    description: ""
	};
    }

    render() {
	const { completionCode } = this.props.video;
	if (completionCode && completionCode === CODE_SUCCESS)
	    return(<Redirect to="/videos"/>);
	return(
	    <form>
		Video Upload
		<Dropzone onDrop={(files) => this.state.file = files[0]}>
		    <div>Drop files here</div>
		</Dropzone>
		<br/>
		{"Description: "}
		<textarea rows="4" cols="50"
			  onChange={(e) => this.setState({description: e.target.value})}
		/>
		<button type="button"
			disabled={!this.state.description
			       || this.state.file === undefined}
			onClick={(e) => this.props.uploadVideo(this.state)}>
		    Upload
		</button>
		{this.props.completionCode}
		
	    </form>
	);
    }
    
};

const VideoUpload = withRouter(connect(mapStateToProps, mapDispatchToProps)(ConnectedVideoUpload));


export default VideoUpload;
