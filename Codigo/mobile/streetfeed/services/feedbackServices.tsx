import { useEffect, useState } from "react";
import { ICadastroFeedback, IFeedback } from "../interfaces/IFeedback";

const listaMocksFeedbacks: Array<IFeedback> = [{
    usuario: 12,
    tipo: "Buraco",
    y: "-19.9331390",
    x: "-43.9370870",
    z: "0",
    score: 8,
    descricao: "Buraco no meio da rua",
    createdAt: "2022-06-14T13:28:00",
    id_feedback: 1
},{
    usuario: 11,
    tipo: "Buraco",
    y: "-19.9331371",
    x: "-43.9370840",
    z: "0",
    score: 2,
    descricao: "Fiquei garrado nessa rua, tive que voltar",
    createdAt: "2022-06-14T15:16:21",
    id_feedback: 2
}]

let feedbacks: Array<IFeedback> = [];

async function request(input: RequestInfo, init?: RequestInit | undefined){
    return new Promise<Response>(async (resolve, reject) => {
        let fetching = true;
        let timeouted = false;
        setTimeout(()=>{
            if (fetching){
                timeouted = true;
                reject("Timeout");
            }
        }, 3000);
        try {
            const fetchResult = await fetch(input, init);
            resolve(fetchResult);
        } catch (error) {
            if (!timeouted)
                reject(error);
        } finally {
            fetching = false;
        }
    })
}

async function ListarFeedbacks(){
    let retorno: Array<IFeedback>;
    try {
        const response = await request("http://192.168.0.15:3001/listFb");
        if (response.status === 200){
            const body = await response.json() as Array<IFeedback>;
            retorno =  body;
        }
        else{
            retorno = listaMocksFeedbacks;
        }
        
    } catch (error) {
        retorno = listaMocksFeedbacks;
    }

    feedbacks = retorno;
    return retorno;
}

export function useListaFeedbacks(){
    const [ lstFeedbacks, setLstFeedbacks ] = useState<Array<IFeedback>>([]);
    
    useEffect(()=>{
        ListarFeedbacks()
        .then(res => {
            setLstFeedbacks(res);
        })
    }, [])

    return lstFeedbacks;
}

export function GetFeedback(id_feedback: number){
    let feedback = (feedbacks.find(f => f.id_feedback === id_feedback));
    if (!feedback)
        feedback = listaMocksFeedbacks[0];
    
    return feedback;
}

export async function CadastrarFeedback(feedback: ICadastroFeedback){
    try {
        const response = await request("http://192.168.0.15:3001/cadFb", {
            method: "POST",
            body:  JSON.stringify(feedback),
        });
        if (response.status !== 200)
            cadastroFake();
    } catch (error) {
        cadastroFake();
    }

    function cadastroFake(){
        const feedfake = {
            ...feedback,
            createdAt: new Date().toISOString(),
            id_feedback: listaMocksFeedbacks[listaMocksFeedbacks.length-1].id_feedback + 1,
            score: 1,
            usuario: 1,
            z: "0",
        } as IFeedback

        listaMocksFeedbacks.push(feedfake);
    }
}