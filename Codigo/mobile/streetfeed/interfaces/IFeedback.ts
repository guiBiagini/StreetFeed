export interface IFeedback{
    id_feedback: number;
    x: string;
    y: string;
    z: string;
    createdAt: string;
    tipo: string;
    descricao: string;
    score: number;
    usuario: number;
}

export type ICadastroFeedback = Pick<IFeedback, "x" | "y" | "descricao" | "tipo">