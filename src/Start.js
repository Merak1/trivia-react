import React, { Component } from 'react'

class Start extends Component {
    state = {
        showing: true,
        trivia: {},
        trivia_id: "",
        trivia_category: {},
        trivia_airdate: "",
        trivia_dificulty: "",
        trivia_question: "",
        trivia_answer: ""
    }
    componentDidMount() {
        console.log(typeof this.state.trivia)
    }
    getTrivia = async () => {
        try {

            const res = await fetch("http://jservice.io/api/random")
            let data = await res.json()
            data = data[0]
            this.setState({ trivia: data })
            this.setState({ trivia_id: data.id })
            this.setState({ trivia_category: data.category })
            this.setState({ trivia_airdate: data.airdate })
            this.setState({ trivia_dificulty: data.value }) // dificulty == value ???
            this.setState({ trivia_question: data.question })
            this.setState({ trivia_answer: data.answer })

            console.log('data', this.state.trivia)

        } catch (err) {
            console.log("err", err)
        }
    }
    newQuestion = () => {
        this.getTrivia()
        this.setState({ showing: true })

    }

    render() {

        if (this.state.trivia_id === "") {
            return (
                <div className="start-game">
                    <h1 onClick={this.getTrivia} >Start game</h1>
                </div>
            )
        } else {
            return (
                <div className="container">
                    <div className="question-container">
                        <div className="burned-questions">
                            <p>Burned cuestions 0</p>

                        </div>
                        <div className="trivia-category">
                            <p>trivia category --- {this.state.trivia_category.title} </p>
                        </div>
                        <div className="trivia-question">
                            <div className="trivia-question__data">
                                <div className="question-airdate"> airdate --- {this.state.trivia_airdate} </div>
                                <div className="question-dificulty"> dificulty ---  {this.state.trivia_dificulty} </div>

                                <p>Question: {this.state.trivia_question}</p>
                                <div className="question-answer">
                                    <p onClick={this.show_answer}>REVEAL ANSWER </p>

                                    <button onClick={() => this.setState({ showing: !this.state.showing })}>toggle</button>
                                    {this.state.showing
                                        ? null
                                        : <div>  {this.state.trivia_answer} </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="next-question">
                            <h1 onClick={this.newQuestion}>NEXT QUESTION</h1>
                        </div>
                    </div>



                </div>
            )
        }

    }
}

export default Start;