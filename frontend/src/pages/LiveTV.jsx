import { useState, useEffect } from "react";
import { API } from "../App";
import axios from "axios";
import { Radio, Tv, Zap } from "lucide-react";

export default function LiveTV() {
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);

  useEffect(() => {
    axios.get(`${API}/live-tv`, { timeout: 4000 }).then(r => {
      setChannels(r.data);
      if (r.data.length > 0) setActiveChannel(r.data[0]);
    }).catch(() => {});
  }, []);

  return (
    <div data-testid="live-tv-page" className="min-h-screen bg-[#080808]">

      {/* Live Banner */}
      <div className="py-3 px-4 sticky top-[84px] z-20 bg-[#0d0d0d] border-b border-[#1f1f1f]">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#7c3aed] flex items-center justify-center">
              <Zap size={12} className="text-white" fill="white" />
            </div>
            <span className="text-[13px] font-bold text-[#f0f0f0] tracking-tight">Live TV</span>
          </div>
          <div className="flex items-center gap-1.5 ml-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef4444] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#ef4444]" />
            </span>
            <span className="text-[10px] text-[#ef4444] font-bold uppercase tracking-wider">On Air</span>
          </div>
          <span className="ml-auto text-[11px] text-[#404040]">{channels.length} channels</span>
        </div>
      </div>

      {/* Player */}
      {activeChannel ? (
        <div className="max-w-5xl mx-auto">
          <div className="relative w-full aspect-video bg-black">
            <iframe
              data-testid="live-player"
              src={`https://www.youtube.com/embed/${activeChannel.youtube_id}?autoplay=1&mute=1`}
              title={activeChannel.name}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="px-4 py-3 border-b bg-[#0d0d0d] border-[#1f1f1f]">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#ef4444] rounded text-white text-[10px] font-bold">
                <Radio size={11} /> LIVE
              </div>
              <h2 className="font-semibold text-[15px] text-[#f0f0f0]">{activeChannel.name}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#7c3aed]/10 border border-[#7c3aed]/20 mb-4">
            <Tv size={24} className="text-[#7c3aed]" />
          </div>
          <p className="text-[#555] text-[14px]">No live channels available</p>
        </div>
      )}

      {/* Channel List */}
      {channels.length > 1 && (
        <div className="max-w-5xl mx-auto px-4 py-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#404040] mb-4">
            Other Channels
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {channels.filter(c => c.id !== activeChannel?.id).map(ch => (
              <button
                key={ch.id}
                data-testid={`channel-${ch.id}`}
                onClick={() => setActiveChannel(ch)}
                className="rounded-xl overflow-hidden border border-[#1f1f1f] bg-[#0d0d0d] hover:border-[#7c3aed]/40 transition-all hover:scale-[1.02] text-left"
              >
                <div className="relative aspect-video">
                  <img
                    src={`https://img.youtube.com/vi/${ch.youtube_id}/hqdefault.jpg`}
                    alt={ch.name}
                    className="w-full h-full object-cover brightness-75"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 px-1.5 py-0.5 bg-[#ef4444] rounded text-white text-[10px] font-bold">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> LIVE
                  </div>
                </div>
                <div className="p-2">
                  <p className="text-[12px] font-medium truncate text-[#e5e5e5]">{ch.name}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export { LiveTV };
