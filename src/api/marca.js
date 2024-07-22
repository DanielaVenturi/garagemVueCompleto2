import axios from "axios";
export default class MarcaApi {
  async buscarTodasAsMarcas() {
    const { data } = await axios.get("/marca/");
    return data.results;
  }
  async adicionarMarca(marcas) {
    const { data } = await axios.post("/marca/", marcas);
    return data.results;
  }
  async atualizarMarca(marcas) {
    const { data } = await axios.put(`/marca/${marcas.id}/`, marcas);
    return data.results;
  }
  async excluirMarca(id) {
    const { data } = await axios.delete(`/marca/${id}/`);
    return data.results;
  }
}
