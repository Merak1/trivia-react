import React, { Component } from 'react'

class Main extends Component {
    state = {
        burnedQuestions: 0,
        lastQuestionId: "",
        showing: true,
        triviaId: "",
        triviaCategory: {},
        triviaAirdate: "",
        triviaDificulty: "",
        triviaQuestion: "",
        triviaAnswer: ""
    }
    getTrivia = async () => {
        try {
            const res = await fetch("http://jservice.io/api/random")
            const data = await res.json()
            const triviaData = data[0]
            console.log(triviaData)
            this.setState({
                triviaId: triviaData.id,
                triviaCategory: triviaData.category.title,
                triviaAirdate: triviaData.airdate,
                triviaDificulty: triviaData.value,
                triviaQuestion: triviaData.question,
                triviaAnswer: triviaData.answer
            })
        } catch (err) {
            console.log("err", err)
        }
    }
    newQuestion = () => {
        this.getTrivia()
        this.setState({ showing: true })
    }
    viewQuestion = () => {
        this.burnCurrentQuestion()
        this.setState({ showing: !this.state.showing })
    }
    burnCurrentQuestion = () => {
        const { triviaId, lastQuestionId, burnedQuestions } = this.state
        if (lastQuestionId === "" || triviaId !== lastQuestionId) {
            this.setState({ burnedQuestions: burnedQuestions + 1 })
            this.setState({ lastQuestionId: triviaId })
        }
    }
    dateFormat = () => {
        const formatedDate = new Date(this.state.triviaAirdate);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return formatedDate.toLocaleDateString(undefined, options)
    }

    render() {
        const { triviaId, triviaDificulty, triviaCategory, burnedQuestions, triviaQuestion, triviaAnswer, showing } = this.state
        const dateFormat = this.dateFormat()
        const newQuestion = this.newQuestion;
        const viewQuestion = this.viewQuestion
        if (triviaId === "") {
            return (
                <div onClick={this.getTrivia} className="clickable start-game">
                    <h1  >START GAME</h1>
                </div>
            )
        }
        return (
            <div className="container">

                <div className="question-container">
                    <div className=" row burned-questions">
                        <p>Burned questions:  {burnedQuestions}</p>
                    </div>
                    <div className="row trivia-category">
                        <p> category: {triviaCategory} </p>
                    </div>
                    <div className="row trivia-question">
                        <div className="trivia-question__data">
                            <div className="question-airdate"><p title="air date"> {dateFormat}</p> </div>
                            <div className="question-dificulty"><p title="dificulty">  $ {triviaDificulty}</p> </div>
                            {showing
                                ? <div className="question-answer">{triviaQuestion}</div>
                                : <div className="question-answer">  {triviaAnswer} </div>
                            }
                        </div>
                        <div onClick={viewQuestion} className="clickable question-show-answer">
                            {showing
                                ? <h1>REVEAL ANSWER</h1>
                                : <h1>VIEW QUESTION</h1>
                            }
                        </div>
                    </div>
                    {
                        showing
                            ? <div className="blocked row next-question">
                                <h1 >NEXT QUESTION</h1>
                            </div>
                            : <div onClick={newQuestion} className="clickable  row next-question ">
                                <h1 >NEXT QUESTION</h1>
                            </div>
                    }
                </div>
            </div>
        )

    }
}

export default Main;