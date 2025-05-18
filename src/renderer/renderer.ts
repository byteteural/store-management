declare global {
  interface Window {
    versions: {
      ping: () => Promise<any>;
    };
  }
}

const func = async () => {
  const response = await window.versions.ping();
  console.log(response); // prints out 'pong'
};

func();
