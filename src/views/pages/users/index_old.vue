<template>
  <div id="users-list">

    <vs-table
      v-if="queryData && queryData.length"
      :sst="true"
      @search="handleSearch"
      @sort="handleSort"
      pagination
      :max-items="itemsPerPage"
      search
      :data="queryData">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="ArchiveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Archive</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="FileIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Print</span>
                </span>
              </vs-dropdown-item>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="SaveIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Another Action</span>
                </span>
              </vs-dropdown-item>

            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
            <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
            <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>


        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ parseInt(queryData.current_page) * parseInt(queryData.per_page) - (parseInt(queryData.per_page) - 1) }} - {{ parseInt(queryData.total) - parseInt(queryData.current_page) * parseInt(queryData.per_page) > 0 ? parseInt(queryData.current_page) * parseInt(queryData.per_page) : parseInt(queryData.total) }} of {{ parseInt(queryData.total) }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="handleItemsPerPage(5)">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="handleItemsPerPage(10)">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="handleItemsPerPage(15)">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="handleItemsPerPage(20)">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>


      <template slot="thead">
        <vs-th sort-key="profiles.firstname">
          Firstname
        </vs-th>
        <vs-th sort-key="profiles.lastname">
          Lastname
        </vs-th>
        <vs-th sort-key="email">
          Email
        </vs-th>
      </template>

      <template slot-scope="{data}">
        <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="data[indextr].firstname">
            {{data[indextr].firstname}}
          </vs-td>

          <vs-td :data="data[indextr].lastname">
            {{data[indextr].lastname}}
          </vs-td>
          <vs-td :data="data[indextr].email">
            {{data[indextr].email}}
          </vs-td>

        </vs-tr>
      </template>
    </vs-table>

    <pre ref="pre"></pre>
  </div>
</template>

<script>
  import RegisterStoreModule from '@/mixins/RegisterStoreModule'
  import usersStore from '@/store/modules/users.store';
  export default {
    name: "index",
    mixins: [ RegisterStoreModule ],
    data () {
      return {
        selected: [],
        payload: {},
        itemsPerPage:10,
        total:0,
        isMounted:false
      }
    },
    created ()
    {
      this.registerStoreModule('usersModule', usersStore);
      this.payload.sort= {};
      this.payload.page=1
      this.payload.itemsPerPage=this.itemsPerPage
      this.$store.dispatch('usersModule/fetchAllUsers',this.payload)
    },
    computed:
      {
        queryData() {
          return this.$store.state.usersModule.users
        },
        currentPage () {
          if (this.isMounted) {
            return this.$refs.table.currentx
          }
          return 0
        },
      },
    methods:{
      addNewData () {
        //
      },
      handleSearch(searching) {
        let _print = `The user searched for: ${searching}\n`
        this.$refs.pre.appendChild(document.createTextNode(_print))
      },
      handleChangePage(page) {
        let _print = `The user changed the page to: ${page}\n`
        this.$refs.pre.appendChild(document.createTextNode(_print))
      },
      handleSort(key, active) {
        this.payload.sort.col=key;
        this.payload.sort.direction=active;
        this.$store.dispatch('usersModule/fetchAllUsers',this.payload)
      },
      handleItemsPerPage(nr){
        this.payload.itemsPerPage=nr
        this.itemsPerPage=nr
        this.$store.dispatch('usersModule/fetchAllUsers',this.payload)
      }
    }
  }
</script>

<style lang="scss">
  #users-list {
    .vs-con-table {

      .product-name {
        max-width: 23rem;
      }

      .vs-table--header {
        display: flex;
        flex-wrap: wrap-reverse;
        margin-left: 1.5rem;
        margin-right: 1.5rem;
        > span {
          display: flex;
          flex-grow: 1;
        }

        .vs-table--search{
          padding-top: 0;

          .vs-table--search-input {
            padding: 0.9rem 2.5rem;
            font-size: 1rem;

            &+i {
              left: 1rem;
            }

            &:focus+i {
              left: 1rem;
            }
          }
        }
      }

      .vs-table {
        border-collapse: separate;
        border-spacing: 0 1.3rem;
        padding: 0 1rem;


        tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
        }
      }

      .vs-table--thead{
        th {
          padding-top: 0;
          padding-bottom: 0;

          .vs-table-text{
            text-transform: uppercase;
            font-weight: 600;
          }
        }
        th.td-check{
          padding: 0 15px !important;
        }
        tr{
          background: none;
          box-shadow: none;
        }
      }

      .vs-table--pagination {
        justify-content: center;
      }
    }
  }
</style>

