import React, {useEffect, useState} from 'react'
import './App.css';
import axios from "axios"

function App() {
  useEffect (() => {
    axios.get("https://www.fruityvice.com/api/fruit/all")
    .then (() =>{
        console.log("Deu tudo certo")
    }).catch(() =>{
        console.log("Deu tudo ERRADO")
    })
  }, [])

	return(
		<div className="app">

			<div className="cards">

				<div className="card" >
					<div className="card-body" >
						<h1>Título do meu post</h1>
						<div className="line"></div>
						<h2>Conteudo da minha postagem, conteúdo da minha postagem</h2>
					</div>
				</div>
			
			</div>

		</div>
	)

}

export default App;
