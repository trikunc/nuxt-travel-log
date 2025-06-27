<script lang="ts" setup>
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { Field, useForm } from "vee-validate";
// import * as zod from "zod";

import { InsertLocation } from "../../lib/db/schema";

// const validationSchema = toTypedSchema(
//   zod.object({
//     name: zod.string().min(1).max(100),
//     description: zod.string().optional(),
//     lat: zod.number().min(-90).max(90),
//     long: zod.number().min(-180).max(180),
//   }),
// );

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const loading = ref(false);
const submitted = ref(false);
const submitError = ref("");
const { handleSubmit, errors, meta, setErrors } = useForm({
  // validationSchema,
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    lat: 0,
    long: 0,
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });

    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage || "An error occurred while adding the location.";
  }
  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved change will be lost.");
    if (!confirm) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>

    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <span>{{ submitError }}</span>
    </div>

    <form
      action=""
      class="flex flex-col gap-2"
      @submit.prevent="onSubmit"
    >
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="loading"
      />
      <AppFormField
        name="description"
        label="Description"
        type="textarea"
        :error="errors.description"
        :disabled="loading"
      />

      <!-- <AppFormField
        name="lat"
        label="Latitude"
        :error="errors.lat"
        :disabled="loading"
      />
      <AppFormField
        name="long"
        label="Longitude"
        :error="errors.long"
        :disabled="loading"
      /> -->

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Latitude
        </legend>
        <Field
          name="lat"
          type="number"
          as="input"
          class="input w-full"
          :class="{ 'input-error': errors.lat }"
          :disabled="loading"
        />
        <p v-if="errors.lat" class="fieldset-label text-error">
          {{ errors.lat }}
        </p>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">
          Longitude
        </legend>
        <Field
          name="long"
          type="number"
          as="input"
          class="input w-full"
          :class="{ 'input-error': errors.long }"
          :disabled="loading"
        />
        <p v-if="errors.long" class="fieldset-label text-error">
          {{ errors.long }}
        </p>
      </fieldset>

      <div class="flex justify-end gap-2">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-outline"
          @click="router.back"
        >
          <Icon name="tabler:arrow-left" size="24" />
          Cancel
        </button>
        <button
          :disabled="loading"
          type="submit"
          class="btn btn-primary"
        >
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
