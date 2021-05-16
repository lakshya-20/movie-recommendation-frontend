import React from 'react';
import packageJson from '../package.json';
global.appVersion = packageJson.version;

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());
    if (a === b) continue;    
    return a > b || isNaN(b);
  }
  return false;
};

class CacheBuster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isLatestVersion: false,
      refreshCacheAndReload: async () => {
        console.log('Clearing cache and hard reloading...')
        if (caches) {
          // Service worker cache should be cleared with caches.delete()
          const names = await caches.keys();
          await Promise.all(names.map(name => caches.delete(name)));
        }
        // delete browser cache and hard reload
        window.location.reload(true);
      }
    };
  }

  componentDidMount() {
    fetch('/meta.json',{
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      }
    })
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
        const currentVersion = global.appVersion;

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          this.setState({ loading: false, isLatestVersion: false });
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          this.setState({ loading: false, isLatestVersion: true });
        }
      });
  }
  render() {
    const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
    return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
  }
}

export default CacheBuster;