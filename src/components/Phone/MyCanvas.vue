<template>
 <image mask="url(#mask-2)" :xlink:href="url" x="-78.3" y="0" height="290px" width="290px"/>
</template>

<script>
export default {
    props:{
        url: {
                required:true,
                type:String
        }
  }
  }
</script>