<template>
    <v-app>
      <v-layout>
        <app-header />
        <app-nav-bar />
        <v-main
          class="d-flex align-center justify-center"
          style="min-height: 300px"
        >
          <slot />
        </v-main>
        <app-footer />
      </v-layout>
    </v-app>
  </template>