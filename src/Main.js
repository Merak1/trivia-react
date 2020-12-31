import React, { Component } from 'react'

class Main extends Component {
    state = {
        burned_questions: 0,
        last_Question_id: "",
        showing: true,
        trivia_id: "",
        trivia_category: {},
        trivia_airdate: "",
        trivia_dificulty: "",
        trivia_question: "",
        trivia_answer: ""
    }
    getTrivia = async () => {
        try {
            const res = await fetch("http://jservice.io/api/random")
            let data = await res.json()
            data = data[0]
            this.setState({ trivia_id: data.id })
            this.setState({ trivia_category: data.category })
            this.setState({ trivia_airdate: data.airdate })
            this.setState({ trivia_dificulty: data.value })
            this.setState({ trivia_question: data.question })
            this.setState({ trivia_answer: data.answer })
        } catch (err) {
            console.log("err", err)
        }
    }
    newQuestion = () => {
        this.getTrivia()
        this.setState({ showing: true })
    }
    viewQuestion = () => {
        this.burnCurrentQuestion(this.state.trivia_id)
        this.setState({ showing: !this.state.showing })
    }
    burnCurrentQuestion = (currentQuestionId) => {
        if (this.state.last_Question_id === "" || currentQuestionId !== this.state.last_Question_id) {
            this.setState({ burned_questions: this.state.burned_questions + 1 })
            this.setState({ last_Question_id: currentQuestionId })
        }
    }
    dateFormat = () => {
        let formatedDate = new Date(this.state.trivia_airdate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return formatedDate.toLocaleDateString(undefined, options)
    }

    render() {
        if (this.state.trivia_id === "") {
            return (
                <div onClick={this.getTrivia} className="clickable start-game">
                    <h1  >START GAME</h1>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="question-container">
                        <div className=" row burned-questions">
                            <p>Burned questions:  {this.state.burned_questions}</p>

                        </div>
                        <div className="row trivia-category">
                            <p>trivia category: {this.state.trivia_category.title} </p>
                        </div>
                        <div className="row trivia-question">
                            <div className="trivia-question__data">
                                <div className="question-airdate"> air date: {this.dateFormat()} </div>
                                <div className="question-dificulty"> dificulty:  {this.state.trivia_dificulty} </div>
                                {this.state.showing
                                    ? <div className="question-answer">{this.state.trivia_question}</div>
                                    : <div className="question-answer">  {this.state.trivia_answer} </div>
                                }
                            </div>
                            <div onClick={this.viewQuestion} className="clickable question-show-answer">
                                {this.state.showing
                                    ? <h1>REVEAL ANSWER</h1>
                                    : <h1>VIEW QUESTION</h1>
                                }
                            </div>
                        </div>
                        {
                            this.state.showing
                                ? <div className="blocked row next-question">
                                    <h1 >NEXT QUESTION</h1>
                                </div>
                                : <div onClick={this.newQuestion} className="clickable  row next-question ">
                                    <h1 >NEXT QUESTION</h1>
                                </div>
                        }
                    </div>
                </div>
            )
        }
    }
}

export default Main;