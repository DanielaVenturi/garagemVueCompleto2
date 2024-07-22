<script setup>
import { ref, reactive, onMounted } from "vue";
import CorApi from "@/api/cor";
const corApi = new CorApi();

const defaultCor = { id: null, nome: "" };
const cors = ref([]);
const cor = reactive({ ...defaultCor });

onMounted(async () => {
  cors.value = await corApi.buscarTodasAsCores();
});

function limpar() {
  Object.assign(cor, { ...defaultCor });
}

async function salvar() {
  if (cor.id) {
    await corApi.atualizarCor(cor);
  } else {
    await corApi.adicionarCor(cor);
  }
  cors.value = await corApi.buscarTodasAsCores();
  limpar();
}

function editar(cor_para_editar) {
  Object.assign(cor, cor_para_editar);
}

async function excluir(id) {
  await corApi.excluirCategoria(id);
  cors.value = await corApi.buscarTodasAsCores();
  limpar();
}
</script>

<template>
  <h1>Cor</h1>
  <hr />
  <div class="form">
    <input type="text" v-model="cor.nome" placeholder="Descrição" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="cor in cors" :key="cor.id">
      <span @click="editar(cor)">
        ({{ cor.id }}) - {{ cor.nome }} -
      </span>
      <button @click="excluir(cor.id)">x</button>
    </li>
  </ul>
</template>

<style></style>
