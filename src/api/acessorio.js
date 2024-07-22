import axios from "axios";
export default class AcessoriosApi {
  async buscarTodasOsAcessorios() {
    const { data } = await axios.get("/acessorio/");
    return data.results;
  }
  async adicionarAcessorio(acessorios) {
    const { data } = await axios.post("/acessorio/", acessorios);
    return data.results;
  }
  async atualizarAcessorio(acessorios) {
    const { data } = await axios.put(`/acessorio/${acessorios.id}/`, acessorios);
    return data.results;
  }
  async excluirAcessorio(id) {
    const { data } = await axios.delete(`/acessorio/${id}/`);
    return data.results;
  }
}
