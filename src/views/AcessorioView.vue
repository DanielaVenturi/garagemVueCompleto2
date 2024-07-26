<script setup>
import { ref, reactive, onMounted } from "vue";
import AcessoriosApi from "@/api/acessorio";
const acessoriosApi = new AcessoriosApi();

const defaultAcessorio = { id: null, descricao: "" };
const acessorios = ref([]);
const acessorio = reactive({ ...defaultAcessorio });

onMounted(async () => {
  acessorios.value = await acessoriosApi.buscarTodasOsAcessorios();
});

function limpar() {
  Object.assign(acessorio, { ...defaultAcessorio });
}

async function salvar() {
  if (acessorio.id) {
    await acessoriosApi.atualizarAcessorio(acessorio);
  } else {
    await acessoriosApi.adicionarAcessorio(acessorio);
  }
  acessorios.value = await acessoriosApi.buscarTodasOsAcessorios();
  limpar();
}

function editar(acessorio_para_editar) {
  Object.assign(acessorio, acessorio_para_editar);
}

async function excluir(id) {
  await acessoriosApi.excluirAcessorio(id);
  acessorios.value = await acessoriosApi.buscarTodasOsAcessorios();
  limpar();
}
</script>

<template>
  <h1 class="titulo-acessorio">Acessório</h1>

  <div class="acessorio">
    <div class="form-section">
      <input
        type="text"
        v-model="acessorio.descricao"
        placeholder="Descrição"
        class="input-field"
      />
      <button @click="salvar" class="btn salvar">Salvar</button>
      <button @click="limpar" class="btn limpar">Limpar</button>
    </div>

    <div class="list-section">
      <ul class="acessorio-list">
        <li v-for="acessorio in acessorios" :key="acessorio.id" class="acessorio-item">
          <span @click="editar(acessorio)" class="acessorio-text">
            ({{ acessorio.id }}) - {{ acessorio.descricao }} -
          </span>
          <button @click="excluir(acessorio.id)" class="btn-delete">x</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.acessorio {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-section,
.list-section {
  padding: 20px;
  background-color: #ccc;
  border-radius: 8px;
}

.input-field {
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
  font-size: var(--font-size);
}
.titulo-acessorio{
  font-size: 24px;
  text-align: center;
}
.btn {
  padding: 10px 20px;
  margin: 10px 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.salvar {
  background-color: #000000;
  color: white;
}

.btn.salvar:hover {
  background-color: #817373;
}

.btn.limpar {
  background-color: #000000;
  color: white;
}

.btn.limpar:hover {
  background-color: #817373;
}

.btn-delete {
  background-color: #0c0a0a;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-delete:hover {
  background-color: #4b3433;
  transform: scale(1.1);
}

.acessorio-list {
  list-style-type: none;
  padding: 0;
}

.acessorio-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: var(--background-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.acessorio-item:hover {
  background-color: var(--hover-background-color);
  transform: translateY(-3px);
}

.acessorio-text {
flex-grow: 1;
  cursor: pointer;
  color: #000000;
  font-size: var(--font-size);
    transition: color 0.3s ease;
    background-color: aliceblue;
    border-radius: 4px;
    padding: 10px;
}

.acessorio-text:hover {
  color:#817373;;
}

.btn-delete {
  margin-left: 10px;
}
@media (max-width: 978px) {
  .acessorio {
    grid-template-columns: 1fr ;
    width: 90%;
  }
  .btn {
    width: 100%;
    margin: 5px 0;
  }
  .input-field {
    font-size: 14px;
  }
  .titulo_acessorio {
    font-size: 20px;
  }
} 
@media (max-width:820px) {
  .acesorio{
    grid-template-columns: 1fr;
    width: 75%;
  }
}
</style>