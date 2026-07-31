<template>
  <div class="class flex flex-col gap-5">
    <!-- Button -->
     <Card>
    <div class=" flex md:flex-row flex-col gap-8">
      <div>
        <h1 class="text-xl font-semibold mb-3">Button</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
          <Button variant="primary" label="Primary" type="button" />
          <Button variant="secondary" label="Secondary" type="button" />
          <Button variant="ghost" label="ghost" type="button" />
        </div>
      </div>
      <div>
        <h1 class="text-xl font-semibold mb-3">Loading button</h1>
        <div class="flex items-center gap-3 md:flex-row flex-col">
          <Button
            :loading="true"
            variant="primary"
            label="Primary"
            type="button"
          />
          <Button
            :loading="true"
            variant="secondary"
            label="Secondary"
            type="button"
          />
          <Button :loading="true" variant="ghost" label="ghost" type="button" />
        </div>
      </div>
    </div>
</Card>
    <!-- Input -->

    <Card>
      <div class=" flex md:flex-row flex-col gap-8">
        <h1 class="text-xl font-semibold mb-3">Input</h1>
        <div class="flex md:flex-row flex-col items-center gap-3">
          <Input
            type="text"
            placeholder="Text"
            label="Text"
            name="text"
          />
          <Input
            type="number"
            placeholder="Number"
            label="Number"
            name="number"
          />
          <Input
            type="password"
            placeholder="Password"
            label="Password"
            name="password"
          />
        </div>
      </div>
      <div>
        <!-- <h1 class="text-xl font-semibold mb-3">Loading button</h1>
                <div class="flex items-center gap-3">
                    <Button :loading="true" variant="primary" label="Primary" type="button" />
                    <Button :loading="true" variant="secondary" label="Secondary" type="button" />
                    <Button :loading="true" variant="ghost" label="ghost" type="button" />
                </div> -->
      </div>
    </Card>
<Card>
      <Textarea placeholder="Textarea" name="textarea" label="Textarea"/>
    </Card>
    <Card>
      <h1 class="text-xl font-semibold mb-3">Formate Date</h1>
      <FormateDate date="2026-07-26T11:16:02.259Z" lang="fr"/>
      <FormateDate date="2026-07-26T11:16:02.259Z" lang="ag"/>
    </Card>

      <Card>
    <div class=" flex md:flex-row flex-col gap-8">
      <div>
        <h1 class="text-xl font-semibold mb-3">Spiners</h1>
        <div class="flex flex-col md:flex-row justify-center items-center gap-5">
        <div class="flex flex-col justify-center items-center"><Spiner size="lg"/><p class="text-xl font-semibold mb-3">lg</p></div>
        <div class="flex flex-col justify-center items-center"><Spiner size="md"/><p class="text-xl font-semibold mb-3">md</p></div>
        <div class="flex flex-col justify-center items-center"><Spiner size="sm"/><p class="text-xl font-semibold mb-3">sm</p></div>
        </div>
        </div>
    </div>
</Card>
    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Skeletons</h1>

        <TableSkeleton />
      </div>
    </Card>
    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Drawers</h1>
        <div class="class flex items-center flex-col md:flex-row gap-3">
          <Button
            type="button"
            variant="primary"
            label="Top"
            :click="() => (isDrawerTop = true)"
          />
          <Button
            type="button"
            variant="primary"
            label="Bottom"
            :click="() => (isDrawerBottom = true)"
          />
          <Button
            type="button"
            variant="primary"
            label="Start"
            :click="() => (isDrawerStart = true)"
          />
          <Button
            type="button"
            variant="primary"
            label="End"
            :click="() => (isDrawerEnd = true)"
          />
        </div>
        <Drawer
          :isOpen="isDrawerTop"
          @close="isDrawerTop = false"
          placement="top"
        />
        <Drawer
          :isOpen="isDrawerBottom"
          @close="isDrawerBottom = false"
          placement="bottom"
        />
        <Drawer
          :isOpen="isDrawerStart"
          @close="isDrawerStart = false"
          placement="start"
        />
        <Drawer
          :isOpen="isDrawerEnd"
          @close="isDrawerEnd = false"
          placement="end"
        />
      </div>
    </Card>
    <Card>
      
<h1 class="text-xl font-semibold mb-3">Combobox</h1>
        <div class="flex items-center md:flex-row flex-col gap-3 h-30">
    <Combobox
    name="country"
    label="Pays"
    placeholder="Sélectionner un pays"
    :options="countries"
  />

    </div>

    </Card>
    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Switchs</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
          <div class="flex justify-center items-center flex-col">
            <Switch />
            <p>Simple Switch</p>
          </div>

          <div class="flex justify-center items-center flex-col">
            <Switch :activeIcon="IconCheck" :inactiveIcon="IconX" />
            <p>Switch with Icons</p>
          </div>
        </div>
      </div>
    </Card>
    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Empty States</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
          <EmptyState
            title="Your cart is empty"
            message="Explore our products and add items to your cart"
          />
          <EmptyState
            title="Your cart is empty"
            message="Explore our products and add items to your cart"
          />
          <EmptyState
            title="Your cart is empty"
            message="Explore our products and add items to your cart"
          />
        </div>
      </div>
    </Card>
    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Badges</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
        <Badge type="success" message="Success"/>
        <Badge type="danger" message="Danger"/>
        <Badge type="primary" message="Primary"/>
        <Badge type="warning" message="Warning"/>
        </div>
      </div>
    </Card>
    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Toasts</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
        <Button variant="primary" label="Success" type="button" :click="showSuccessToast"/>
        <Button variant="primary" label="Danger" type="button" :click="showDangerToast"/>
        <Button variant="primary" label="Warning" type="button" :click="showWarningToast"/>
        <Button variant="primary" label="Info" type="button" :click="showInfoToast"/>
        </div>
      </div>
    </Card>

    <Card>
      <div class="w-full">
        <h1 class="text-xl font-semibold mb-3">Loaders</h1>
        <div class="flex items-center md:flex-row flex-col gap-3">
        <Button variant="primary" label="Success" type="button" :click="showSuccessToast"/>
        <Button variant="primary" label="Danger" type="button" :click="showDangerToast"/>
        <Button variant="primary" label="Warning" type="button" :click="showWarningToast"/>
        <Button variant="primary" label="Info" type="button" :click="showInfoToast"/>
        </div>
      </div>
    </Card>
    
    <Card>
    <Chart/>
    </Card>
    
  </div>
</template>

<script setup lang="ts">
import Badge from "@/components/badge/Badge.vue";
import Button from "@/components/button/Button.vue";
import Drawer from "@/components/drawer/Drawer.vue";
import EmptyState from "@/components/empty/EmptyState.vue";
import Input from "@/components/input/Input.vue";
import TableSkeleton from "@/components/skeleton/TableSkeleton.vue";
import Switch from "@/components/switch/Switch.vue";
import { IconCheck, IconX } from "@tabler/icons-vue";
import { ref } from "vue";
import { useToastStore } from "@/store/toastStore";
import Textarea from "../../components/texterea/Textarea.vue";
import Chart from "@/components/charts/Chart.vue";
import Card from "@/components/card/Card.vue";
import FormateDate from "@/components/formateDate/FormateDate.vue";
import Spiner from "@/components/spiner/Spiner.vue";
import Combobox from "@/components/combobox/Combobox.vue";

const toast = useToastStore();
const isDrawerTop = ref(false);
const isDrawerBottom = ref(false);
const isDrawerStart = ref(false);
const isDrawerEnd = ref(false);
const showSuccessToast = () => {
  toast.show(
    "Opération réussie",
    "success",
    "Les données ont été enregistrées avec succès."
  );
};

const showDangerToast = () => {
  toast.show(
    "Une erreur est survenue",
    "danger",
    "Impossible de traiter votre demande. Veuillez réessayer."
  );
};

const showWarningToast = () => {
  toast.show(
    "Attention",
    "warning",
    "Certaines informations sont incomplètes. Vérifiez les champs requis."
  );
};

const showInfoToast = () => {
  toast.show(
    "Information",
    "info",
    "Une nouvelle mise à jour est disponible."
  );
};


const countries = [
  { label: "Cameroun", value: "cm" },
  { label: "France", value: "fr" },
  { label: "Canada", value: "ca" },
  { label: "Belgique", value: "be" },
];
</script>
