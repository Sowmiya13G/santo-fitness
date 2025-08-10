import { registerSW as viteRegisterSW } from 'virtual:pwa-register';
import { toast } from 'react-toastify';

export function registerSW() {
  console.log('[PWA] Registering service worker...');
  const updateSW = viteRegisterSW({
    onNeedRefresh() {
      console.log('[PWA] New content available, prompting update...');
      toast.info(
        <div>
          <span>A new version is available.</span>
          <button
            style={{
              marginLeft: '10px',
              padding: '4px 8px',
              background: '#4cafef',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onClick={() => updateSW()}
          >
            Update
          </button>
        </div>,
        { autoClose: false }
      );
    },
    onOfflineReady() {
      console.log('[PWA] App ready for offline use');
      toast.success('App is ready to work offline');
    },
  });

  return updateSW;
}
