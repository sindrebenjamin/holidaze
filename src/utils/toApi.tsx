export async function toApi(url, options, setApiStatus) {
  try {
    setApiStatus("loading");
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (e) {
    setApiStatus("error");
    //return e
    console.log(e);
  } finally {
    setApiStatus("idle");
    console.log("kill loader");
  }
}
