const copyButtons = document.querySelectorAll(".copy-btn");

async function copyToClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch (error) {
    return false;
  }
}

copyButtons.forEach((button) => {
  const defaultLabel = button.dataset.label || button.textContent;
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    const success = await copyToClipboard(value);
    button.textContent = success ? "Copied!" : "Copy failed";
    setTimeout(() => {
      button.textContent = defaultLabel;
    }, 2000);
  });
});

