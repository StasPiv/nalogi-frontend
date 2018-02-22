import React from 'react'
import axios, { post } from 'axios'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            file:null,
            data:{
                output: []
            }
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
            this.setState({
                data: response.data
            });
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        const url = 'http://api.nalogi.pozitiffchess.net/calculate-from-file';
        const formData = new FormData();
        formData.append('file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

    render() {
        return (
            <div className="App">
                <form onSubmit={this.onFormSubmit}>
                    <h1>Расчет налогов</h1>
                    <input type="file" onChange={this.onChange} />
                    <button type="submit">Upload</button>
                </form>
                { this.state.data.output.length > 0 ?
                    <div className="App-output">
                        <table>
                            <thead>
                            <tr>
                                <td>Дата</td>
                                <td>Валюта</td>
                                <td>Описание</td>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.data.output.map((item, index) => <tr key={index}>
                                    <td>{item[0]}</td>
                                    <td>{item[1]}</td>
                                    <td>{item[2]}</td>
                                </tr>)
                            }
                            </tbody>
                        </table>
                        <div className="App-totals">
                            <span className="App-total">Доход: {this.state.data.total}</span>
                            <span className="App-tax">Налоги: {this.state.data.tax}</span>
                        </div>
                    </div> :
                    null
                }
            </div>
        )
    }
}

export default App;
