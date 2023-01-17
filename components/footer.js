const footer = () => {
  let year = new Date().getFullYear();
  return (
    // <!-- Footer -->
    `<footer class="sticky-footer py-5">
      <div class="container my-auto text-center">
        <span class="text-white">Copyright &copy;
          <a href="https://github.com/ricky03knowhere" class="text-white font-weight-bold text-decoration-none"
            target="_blank">ricky03knowhere</a>
          <span id="year">${year}</span>
      </div>
    </footer>`
    // <!-- End of Footer -->a
  );
};

export default footer;
