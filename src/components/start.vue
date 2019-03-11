<template>
<div id="start" >
    <div class="box-header with-border">
        <h3 class="box-title">Upload Arch File and Run</h3>
    </div>
        <!-- /.box-header -->
        <!-- form start -->
    <form role="form">
        <div class="box-body" >
            <div class="form-group">
                <label for="Arch">Please Enter the Arch name(Same as Arch File Name)</label>
                <input v-model="arch" class="form-control" id="Arch" placeholder="Arch name">
            </div>
            <div class="form-group">
                <label for="User">User_name</label>
                <input v-model="user" class="form-control" id="User" placeholder="User name">
            </div>
            <div class="row">
                <section class="col-md-8" style="height:50px">
                    <div class="form-group">
                        <label span class="input-group-text" id="inputGroupFileAddon01">Arch File Upload</label>
                        <input type="file" @change="getFile($event)" id="exampleInputFile">
                    </div>
                </section>
                <section class="col-md-4" style="height:50px">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                        Set Config Here
                    </button>
                    <!-- Modal -->
                    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">Config your Run(*:have to set it)</h4>
                                </div>
                                <div class="modal-body">
                                    <div class="form-group">
                                        <label for="run_toend">*Endless or Setting Running time?</label>
                                        <input v-model="run_toend" class="form-control" id="run_toend" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="pop">Running Population</label>
                                        <input v-model="pop" class="form-control" id="pop" placeholder="100">
                                    </div>
                                    <div class="form-group">
                                        <label for="duration">*Running Duration</label>
                                        <input v-model="duration" class="form-control" id="duration" placeholder="duration time">
                                    </div>
                                    <div class="form-group">
                                        <label for="regions">regions</label>
                                        <input v-model="regions" class="form-control" id="regions" placeholder="regions">
                                    </div>
                                    <div class="form-group">
                                        <label for="gmlenabled">Enabled record graphml?</label>
                                        <input v-model="gmlenabled" class="form-control" id="gmlenabled" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="gjsonenabled">Enabled recod graphjson?</label>
                                        <input v-model="gjsonenabled" class="form-control" id="gjsonenabled" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="neo4j">Enabed record neo4j?</label>
                                        <input v-model="neo4j" class="form-control" id="neo4j" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="Msglog">Enabed Msglog?</label>
                                        <input v-model="Msglog" class="form-control" id="Msglog" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="reload">Reload Arch?</label>
                                        <input v-model="reload" class="form-control" id="reload" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="collect">*Enabed Collect Metrics?</label>
                                        <input v-model="collect" class="form-control" id="collect" placeholder="false">
                                    </div>
                                    <div class="form-group">
                                        <label for="addrs">Address:</label>
                                        <input v-model="addrs" class="form-control" id="addrs" >
                                    </div>
                                    <div class="form-group">
                                        <label for="stopstep">Number of Stop Step?</label>
                                        <input v-model="stopstep" class="form-control" id="stopstep" placeholder="0">
                                    </div>
                                    <div class="form-group">
                                        <label for="EurekaPoll">How frequent of Eureka?</label>
                                        <input v-model="EurekaPoll" class="form-control" id="EurekaPoll" placeholder="1s">
                                    </div>
                                    <div class="form-group">
                                        <label for="Keyvals">what is Keyvals?</label>
                                        <input v-model="Keyvals" class="form-control" id="Keyvals" >
                                    </div>
                                    <div class="form-group">
                                        <label for="Filter">Enabed Filter?</label>
                                        <input v-model="Filter" class="form-control" id="Filter" placeholder="false">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="cpuprofile">cpuprofile name?</label>
                                        <input v-model="cpuprofile" class="form-control" id="cpuprofile" >
                                    </div>
                                    <div class="form-group">
                                        <label for="confFile">Configuration file?</label>
                                        <input v-model="confFile" class="form-control" id="confFile" >
                                    </div>
                                    <div class="form-group">
                                        <label for="saveConfFile">Save the ConfFile?</label>
                                        <input v-model="saveConfFile" class="form-control" id="saveConfFile" placeholder="false">
                                    </div>
                                    
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary">Save changes</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>        
        <!-- /.box-body -->
        <div class="box-footer">
            <button v-on:click="submitForm($event)" class="btn btn-primary">Submit</button>
        </div>
    </form>
</div>
</template>
<script>
    import qs from 'qs'
    export default{
        name:"Start",
        data(){
            return{
                arch:'',
                user:'',
                file:'',
                run_toend:'false',
                pop:'100',
                duration:'10',
                regions:'1',
                gmlenabled:'false',
                gjsonenabled:'false',
                neo4j:'false',
                Msglog:'false',
                reload:'false',
                collect:'false',
                addrs:'',
                stopstep:'0',
                EurekaPoll:'1s',
                Keyvals:'',
                Filter:'false',
                cpuprofile:'',
                confFile:'',
                saveConfFile:'fasle',
            }
        },
        methods:{
            getFile(event) {
                this.file = event.target.files[0];
                console.log(this.file);
            },
            submitForm(event) {
                event.preventDefault();
                let formData = new FormData();
                formData.append('file', this.file);
                formData.append('a',this.arch)
                formData.append('un',this.user)
                formData.append('re',this.run_toend)
                formData.append('p',this.pop)
                formData.append('d',this.duration)
                formData.append('w',this.regions)
                formData.append('g',this.gmlenabled)
                formData.append('j',this.gjsonenabled)
                formData.append('n',this.neo4j)
                formData.append('m',this.Msglog)
                formData.append('r',this.reload)
                formData.append('c',this.collect)
                formData.append('k',this.addrs)
                formData.append('s',this.stopstep)
                formData.append('u',this.EurekaPoll)
                formData.append('kv',this.Keyvals)
                formData.append('f',this.Filter)
                // formData.append('cpus',this.cpucount)
                formData.append('cpuprofile',this.cpuprofile)
                formData.append('config',this.confFile)
                formData.append('saveconfig',this.saveConfFile)

                // var params = qs.stringify({
                //     a:this.arch,
                //     file:this.file
                // });
                let config = {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Accept': 'application/json'
                    }
                }
                this.$ajax.post('http://127.0.0.1:8080/start', formData, config).then(function (response) {
                    if (response.status === 200) {
                        console.log(response.data);
                    }
                })
            }
        }
    }
</script>