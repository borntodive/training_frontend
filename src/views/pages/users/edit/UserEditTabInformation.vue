<!-- =========================================================================================
  File Name: UserEditTabInformation.vue
  Description: User Edit Information Tab content
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-edit-tab-info">
    <div class="vx-row">
      <div class="vx-col w-full md:w-1/2">

        <!-- Col Header -->
        <div class="flex items-end">
          <feather-icon icon="UserIcon" class="mr-2" svgClasses="w-5 h-5" />
          <span class="leading-none font-medium">Personal Information</span>
        </div>

        <!-- Col Content -->
        <div>

          <!-- DOB -->
          <div class="mt-4">
            <label class="text-sm">Birth Date</label>
            <flat-pickr v-model="data_local.birthdate" :config="{ dateFormat: 'Y-m-d', maxDate: new Date() }" class="w-full" v-validate="'required'" name="birthdate" />
            <span class="text-danger text-sm"  v-show="errors.has('birthdate')">{{ errors.first('birthdate') }}</span>
          </div>

          <vs-input class="w-full mt-4" label="Mobile" v-model="data_local.phone" v-validate="{regex: '^\\+?([0-9]+)$' }" name="phone" />
          <span class="text-danger text-sm"  v-show="errors.has('phone')">{{ errors.first('phone') }}</span>


          <!-- Gender -->
          <div class="mt-4">
            <label class="text-sm">Gender</label>
            <div class="mt-2">
              <vs-radio v-model="data_local.gender" vs-value="1" class="mr-4">Male</vs-radio>
              <vs-radio v-model="data_local.gender" vs-value="2" class="mr-4">Female</vs-radio>
            </div>
          </div>


        </div>
      </div>

      <!-- Address Col -->
      <div class="vx-col w-full md:w-1/2">

          <!-- Col Header -->
          <div class="flex items-end md:mt-0 mt-base">
            <feather-icon icon="MapPinIcon" class="mr-2" svgClasses="w-5 h-5" />
            <span class="leading-none font-medium">Address</span>
          </div>

          <!-- Col Content -->
          <div>
            <vs-input class="w-full mt-4" label="Address Line 1" v-model="data_local.address" v-validate="'required'" name="address" />
            <span class="text-danger text-sm"  v-show="errors.has('address')">{{ errors.first('address') }}</span>


            <vs-input class="w-full mt-4" label="Post Code" v-model="data_local.zipcode" v-validate="'required|numeric'" name="zipcode" />
            <span class="text-danger text-sm"  v-show="errors.has('zipcode')">{{ errors.first('zipcode') }}</span>

            <vs-input class="w-full mt-4" label="City" v-model="data_local.city" v-validate="'required|alpha'" name="city" />
            <span class="text-danger text-sm"  v-show="errors.has('city')">{{ errors.first('city') }}</span>

            <vs-input class="w-full mt-4" label="State" v-model="data_local.state" v-validate="'required|alpha'" name="state" />
            <span class="text-danger text-sm"  v-show="errors.has('state')">{{ errors.first('state') }}</span>

            <vs-input class="w-full mt-4" label="Country" v-model="data_local.country" v-validate="'required|alpha'" name="country" />
            <span class="text-danger text-sm"  v-show="errors.has('country')">{{ errors.first('country') }}</span>

          </div>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="mt-8 flex flex-wrap items-center justify-end">
          <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes</vs-button>
          <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
    flatPickr
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {

      data_local: JSON.parse(JSON.stringify(this.data)),

      langOptions: [
        { label: 'English',  value: 'english'  },
        { label: 'Spanish',  value: 'spanish'  },
        { label: 'French',   value: 'french'   },
        { label: 'Russian',  value: 'russian'  },
        { label: 'German',   value: 'german'   },
        { label: 'Arabic',   value: 'arabic'   },
        { label: 'Sanskrit', value: 'sanskrit' }
      ]
    }
  },
  computed: {
    validateForm () {
      return !this.errors.any()
    }
  },
  methods: {
    save_changes () {
      /* eslint-disable */
      if (!this.validateForm) return

      // Here will go your API call for updating data
      // You can get data in "this.data_local"

      /* eslint-enable */
    },
    reset_data () {
      this.data_local = Object.assign({}, this.data)
    }
  }
}
</script>
