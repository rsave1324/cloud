const app = new Vue({
  el: "#app",
  data() {
    return {
      name: 'Mircea',
      isNull: false,
      result: {
        name: 'Mircea',
        gender: 'male',
        probability: .96,
        } };


  },
  methods: {
    search() {
      this.isNull = false;
      if (this.name != null && this.name.trim() != "") {
        this.$http.get(`https://api.genderize.io/?name=${this.name}`).then(
        response => {
          response.body.gender != null ? this.showResults(response.body) : this.isNull = true;
        },
        response => {
          alert("API connection failed");
        });

      }
    },
    showResults(result) {
      this.result.name = result.name;
      this.result.gender = result.gender;
      this.result.probability = result.probability;
    } },

  created() {

  } });
//# sourceURL=pen.js