import React, { Component, Fragment } from "react";
import axios from "axios";

import QuesScreenLeftPanel from "../components/ques-screen-left-panel";
import QuesScreenRightPanel from "../components/ques-screen-right-panel";
import TestSummaryModal from "../components/test-summary-modal";
import "../App.css";
import { connect } from "react-redux";
import {
  SetAnswer,
  Unchecked,
  MarkForReview,
  ChangeQuestion,
  SetQuestionPaper,
  UpdateCurrentSection,
} from "../redux/question/question.actions";

class QuestionsScreen extends Component {
  state = {
    checkedOption: -1,
  };

  getAllquestionsCurrentPaper = async (id, pid) => {
    console.log("question paper id type id", id, pid);
    await axios
      .get(`http://localhost:8080/api/getPaper/${this.props.match.params.id}`, {
        headers: {
          Authorization:
            "Bearer " + JSON.parse(localStorage.getItem("login")).token,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(this.props);
        this.props.UpdateCurrentSection(Object.keys(res.data)[0]);
        this.props.SetQuestionPaper(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    console.log("im getallquesfunction");
    console.log(this.props.questions);
  };

  handleBeforeUnload = (e) => {
    e.preventDefault();
    const message =
      "Are you sure you want to leave? All provided data will be lost.";
    e.returnValue = message;
    return message;
  };

  componentDidMount = () => {
    this.getAllquestionsCurrentPaper(
      this.props.quesPprID,
      this.props.paperTypeID
    );

    const { history } = this.props;

    window.addEventListener("popstate", (e) => {
      // alert("Your data will be lost!!!");
      history.go(1);
    });

    window.addEventListener("beforeunload", this.handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", this.handleBeforeUnload);
    };
  };

  // componentWillUpdate = () => {
  //   const { history } = this.props;
  //   window.addEventListener("popstate", (e) => {
  //     // e.preventDefault();
  //     if (window.confirm("you will lost your data") == true) {
  //       // alert("you will lost your data");
  //       history.go(1);
  //     }
  //   });
  // };

  updateCheckedOption = (idx) => {
    this.setState({ checkedOption: idx });
  };

  onChangeQues = (idx) => {
    this.setState({ checkedOption: -1 });
    this.props.ChangeQuestion(idx);
  };

  clearResponse = (qid) => {
    this.setState({ checkedOption: -1 });
    this.props.Unchecked(qid);
  };

  render() {
    return (
      <Fragment>
        {/* <TestSummaryModal /> */}

        {Object.keys(this.props.questions).length ? (
          <div className="row  mx-0">
            <QuesScreenLeftPanel
              questions={this.props.questions}
              answers={this.props.answers}
              MarkForReview={this.props.MarkForReview}
              clearResponse={this.clearResponse}
              SetAnswer={this.props.SetAnswer}
              updateCheckedOption={this.updateCheckedOption}
              checkedOption={this.state.checkedOption}
            />
            <QuesScreenRightPanel
              questions={this.props.questions}
              currentSection={this.props.currentSection}
              onChangeQues={this.onChangeQues}
              updateCheckedOption={this.updateCheckedOption}
            />
          </div>
        ) : (
          <>
            <nav
              className="navbar 
         py-0 px-3 text-white"
              style={{ backgroundColor: "#29385c" }}
            >
              NIMCET - 2021
            </nav>
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "90vh" }}
            >
              <h1>Question Paper not found</h1>
            </div>
          </>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    questions: state.index.questions,
    answers: state.index.answers,
    currentSection: state.index.currentSection,
    quesPprID: state.index.paperID,
    paperTypeID: state.index.paperTypeID,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    SetQuestionPaper: (ppr) => dispatch(SetQuestionPaper(ppr)),
    UpdateCurrentSection: (sec) => dispatch(UpdateCurrentSection(sec)),
    Unchecked: (qid) => dispatch(Unchecked(qid)),
    MarkForReview: () => dispatch(MarkForReview()),
    ChangeQuestion: (idx) => dispatch(ChangeQuestion(idx)),
    SetAnswer: (qid, idx) => dispatch(SetAnswer(qid, idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToprops)(QuestionsScreen);
