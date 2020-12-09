<template>
	<div>
		<fetch-data url="https://jsonplaceholder.typicode.com/users/1"></fetch-data> <!-- props로 url을 보냄 -->
	</div>
</template>

<script>
import FetchData from "./FetchData";

export default {
	components: FetchData
}
</script>