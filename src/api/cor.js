import axios from "axios";
export default class CorApi {
  async buscarTodasAsCores() {
    const { data } = await axios.get("/cor/");
    return data.results;
  }
  async adicionarCor(cors) {
    const { data } = await axios.post("/cor/", cors);
    return data.results;
  }
  async atualizarCor(cors) {
    const { data } = await axios.put(`/cor/${cors.id}/`, cors);
    return data.results;
  }
  async excluirCor(id) {
    const { data } = await axios.delete(`/cor/${id}/`);
    return data.results;
  }
}
