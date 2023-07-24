import React, { Component } from "react";
import { connect } from "react-redux";
import {
  UpdateCurrentSection,
  UpdateCurrentIndex,
  IsAnswered,
  IsVisited,
} from "../redux/question/question.actions";

class QuesScreenLeftPanel extends Component {
  fetchQuestion = (sec) => {
    this.props.UpdateCurrentSection(sec);
    this.props.UpdateCurrentIndex(0);

    this.props.updateCheckedOption(-1);
    this.props.IsVisited();
  };

  onChangeOption = (idx) => {
    this.props.updateCheckedOption(idx);
  };

  onClickSaveAndNext = (qid) => {
    if (this.props.checkedOption !== -1) {
      this.props.SetAnswer(qid, this.props.checkedOption);
      this.props.IsAnswered();
    }
    this.props.updateCheckedOption(-1);

    if (
      this.props.questions[this.props.currentSection].length - 1 >
      this.props.currentIndex
    ) {
      this.props.UpdateCurrentIndex(this.props.currentIndex + 1);
      this.props.IsVisited();
    } else {
      this.props.UpdateCurrentIndex(0);
      const a =
        Object.keys(this.props.questions).indexOf(this.props.currentSection) +
        1;

      if (a === Object.keys(this.props.questions).length) {
        this.props.UpdateCurrentSection(Object.keys(this.props.questions)[0]);
      } else {
        this.props.UpdateCurrentSection(Object.keys(this.props.questions)[a]);
        this.props.IsVisited();
      }
    }
  };

  getQuestion = () => {
    if (
      this.props.questions[this.props.currentSection].length - 1 >=
      this.props.currentIndex
    ) {
      const ques =
        this.props.questions[this.props.currentSection][this.props.currentIndex]
          .question;

      return ques;
    } else {
      const a =
        Object.keys(this.props.questions).indexOf(this.props.currentSection) +
        1;
      if (a === Object.keys(this.props.questions).length) {
        const a = 0;
        this.props.UpdateCurrentSection(Object.keys(this.props.questions)[a]);
        this.props.UpdateCurrentIndex(0);
      } else {
        this.props.UpdateCurrentSection(Object.keys(this.props.questions)[a]);
        this.props.UpdateCurrentIndex(0);
      }
    }
  };

  render() {
    const qid =
      this.props.questions[this.props.currentSection][this.props.currentIndex]
        .qid;

    // const ans = this.props.answers;
    // console.log(ans[qid]);
    return (
      <div className="col-9 px-0">
        <div className=" mx-0">
          <div
            className="row fs-5 ms-0 text-primary text-center"
            style={{ width: "73vw" }}
          >
            {Object.keys(this.props.questions).map((section) => (
              <div
                className={`btn col rounded-pill text-capitalize cursor-pointer fs-5 ${
                  section === this.props.currentSection
                    ? "bg-primary text-white"
                    : "text-primary "
                }`}
                onClick={() => this.fetchQuestion(section)}
              >
                {section}
              </div>
            ))}
          </div>
        </div>
        <hr className="m-0" />
        <div class="row px-3">
          <div class="col text-start text-danger">Question type : MCQ</div>
          <div class="col text-end">Time left : 01:23:44</div>
        </div>
        <hr className="m-0" />
        <div
          className="px-5 fs-4 rounded-pill text-white text-capitalize"
          style={{ backgroundColor: "#29385c", width: "fit-content" }}
        >
          {this.props.currentSection}
        </div>
        <hr className="m-0" />
        <div className="p-2" style={{ height: "75vh" }}>
          {this.props.currentSection && this.getQuestion() ? (
            <div>
              <h5>Question - {this.props.currentIndex + 1}</h5>
              <div className="">{this.getQuestion()}</div>
            </div>
          ) : null}

          <div>
            {this.props.questions[this.props.currentSection].length - 1 >=
            this.props.currentIndex
              ? this.props.questions[this.props.currentSection][
                  this.props.currentIndex
                ].options.map((opt, idx) => (
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="flexRadioDefault"
                      id="flexRadioDefault1"
                      onChange={() => this.onChangeOption(idx)}
                      checked={
                        this.props.checkedOption !== -1
                          ? idx === this.props.checkedOption
                          : // :
                            idx === this.props.answers[qid]
                        // false
                      }
                    />
                    <label class="form-check-label" for="flexRadioDefault1">
                      {opt}
                    </label>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="w-100 d-inline-flex justify-content-between">
          <div className="flex px-3 ">
            <button
              type="button"
              className="btn btn-primary me-4 "
              onClick={this.props.MarkForReview}
            >
              Mark for Review
            </button>
            <button
              type="button"
              className="btn btn-primary "
              onClick={() => this.props.clearResponse(qid)}
            >
              Clear Response
            </button>
          </div>
          <div className="flex px-3">
            {
              <button
                type="button"
                className="btn btn-success"
                onClick={() => this.onClickSaveAndNext(qid)}
              >
                Save and Next
              </button>
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentSection: state.index.currentSection,
    currentIndex: state.index.currentIndex,
    answers: state.index.answers,
  };
};

const mapDispatchToprops = (dispatch) => {
  return {
    UpdateCurrentSection: (sec) => dispatch(UpdateCurrentSection(sec)),
    UpdateCurrentIndex: (value) => dispatch(UpdateCurrentIndex(value)),
    IsVisited: () => dispatch(IsVisited()),
    IsAnswered: () => dispatch(IsAnswered()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToprops
)(QuesScreenLeftPanel);
