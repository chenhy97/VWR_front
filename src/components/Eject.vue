<template>
    <div id="eject">
        <form role="form" >
            <div class="box-header with-border">
              <h3 class="box-title">Abnormality Ejection</h3>
            </div>
            <div class="box-body">
                <div class="form-group">
                    <label>Abnormality Types</label>
                    <select v-model="type" class="form-control select2" style="width: 100%;">
                        <option selected>Choose...</option>
                        <option >Delete</option>
                        <option>Delay</option>
                        <option>Disconnect</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="service1">Please Enter the name of Service1</label>
                    <input class="form-control" v-model="service1" placeholder="Service1 name" id="service1">
                </div>
                <div class="form-group">
                    <label for="service2">Please Enter the name of Service2</label>
                    <input class="form-control" v-model="service2" placeholder="Service2 name" id="service2">
                </div>
                <div class="form-group">
                    <label for="probability">Please Enter the Abnormaly Probability</label>
                    <input class="form-control" v-model="probability" placeholder="1" id="probability">
                </div>
                <div class="form-group">
                    <label for="dtime">Please Enter the delay time(ms)</label>
                    <input class="form-control" v-model="dtime" placeholder="10" id="dtime">
                </div>
                <!-- <div class="form-group">
                    <label for="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile">

                    <p class="help-block">Example block-level help text here.</p>
                </div> -->
            </div>
              <!-- /.box-body -->
              <div class="box-footer">
                    <button v-on:click="doSubmit($event)" class="btn btn-primary">Submit</button>
              </div>
        </form>
    </div>
</template>
<script>
    import qs from 'qs'
    export default {
        name: 'Eject',
        data(){
            return{
                type:"",
                service1:"",
                service2:"",
                probability:"",
                dtime:"",
            }
        },
        methods:{
          doSubmit: function(event) {
            var params = qs.stringify({
                type: this.type,
                service1:this.service1,
                service2:this.service2,
                pb:this.probability,
                dtime:this.dtime
            });
            // var qs=require('qs');
            let config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                //   'Accept': 'application/json'
              }
            }
            this.$ajax.post('/eject', params,config).then((response) => {
                this.info = response
            }, (response) => {
                this.info = "error"
            });
            event.preventDefault();
          }
        }
    }
</script>