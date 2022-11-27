<script setup lang="ts">
import { ref } from "vue";
import { Gpt } from "./services/Gpt";
import { LocalStorage } from "./services/LocalStorage";

const input = ref("");
const prompt = ref("");
const output = ref("");
const apiKey = ref(LocalStorage.get("apiKey") || "");
const isLoading = ref(false);

const execute = async () => {
  isLoading.value = true;
  output.value = (await Gpt.completion(prompt.value, input.value)) ?? "error";
  isLoading.value = false;
};
</script>

<template>
  <div class="container mx-auto">
    <header class="flex py-4">
      <div class="text-3xl font-bold font-serif">NoCode Gpt-3</div>
    </header>

    <main>
      <div class="flex flex-col space-y-4 bg-gray-200 p-4 rounded-lg shadow-sm">
        <div class="flex flex-col space-y-2">
          <label for="apiKey" class="block text-sm font-medium text-gray-700">
            API Key
          </label>
          <input
            v-model="apiKey"
            @change="
              LocalStorage.set(
                'apiKey',
                ($event.target as HTMLInputElement).value
              )
            "
            type="text"
            name="apiKey"
            id="apiKey"
            class="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full border-gray-300 rounded-md focus:ring focus:ring-offset-2 px-4 py-1"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="input" class="block text-sm font-medium text-gray-700">
            Input
          </label>
          <textarea
            v-model="input"
            name="input"
            id="input"
            class="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full border-gray-300 rounded-md focus:ring focus:ring-offset-2 px-4 py-1"
            rows="10"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="prompt" class="block text-sm font-medium text-gray-700">
            Prompt
          </label>
          <textarea
            v-model="prompt"
            name="prompt"
            id="prompt"
            class="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full border-gray-300 rounded-md focus:ring focus:ring-offset-2 px-4 py-1"
            rows="5"
          />
        </div>

        <div class="flex flex-col space-y-2">
          <label for="output" class="block text-sm font-medium text-gray-700">
            Output
          </label>
          <textarea
            v-model="output"
            name="output"
            id="output"
            class="shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-full border-gray-300 rounded-md focus:ring focus:ring-offset-2 px-4 py-1"
            rows="10"
          />
        </div>

        <div class="flex justify-end">
          <button
            @click="execute"
            class="bg-indigo-500 hover:bg-indigo-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white font-medium px-3 py-1 rounded-md text-sm shadow transition-all"
          >
            {{ isLoading ? "..." : "Execute" }}
          </button>
        </div>
      </div>
    </main>
  </div>
</template>
