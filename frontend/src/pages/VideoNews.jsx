import { useState, useEffect, useCallback } from "react";
import { Play, RefreshCw, Youtube, Clock, ChevronRight, Users, Video, Zap } from "lucide-react";

const API_BASE = process.env.REACT_APP_BACKEND_URL || "https://launchcode-production.up.railway.app";

const MOCK_CHANNELS = [
  { id: "ycombinator", name: "Y Combinator", handle: "ycombinator", subscriber_count: 1200000, video_count: 640, view_count: 45000000, thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_kH4XTRMnTRBb3-ZGjEJ_Iiu7c3AjX-TlVMfA=s88-c-k-c0x00ffffff-no-rj" },
  { id: "fireship", name: "Fireship", handle: "fireship", subscriber_count: 2800000, video_count: 540, view_count: 180000000, thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_k4IFW7njv4TRaJMwYJNPXXHITuMJKQKM-LiQ=s88-c-k-c0x00ffffff-no-rj" },
  { id: "andrejkarpathy", name: "Andrej Karpathy", handle: "AndrejKarpathy", subscriber_count: 680000, video_count: 30, view_count: 28000000, thumbnail: "https://yt3.googleusercontent.com/ytc/AIdro_lXYBWfT3KvnA9KKjVgJQcBjfJO7Q=s88-c-k-c0x00ffffff-no-rj" },
];

const MOCK_VIDEOS = [
  { id: "VMj-3S1tku0", title: "The GPT-4 Technical Report Explained", channel_title: "Andrej Karpathy", thumbnail: "https://img.youtube.com/vi/VMj-3S1tku0/hqdefault.jpg", published_at: new Date(Date.now() - 2 * 86400000).toISOString(), view_count: 1200000 },
  { id: "kCc8FmEb1nY", title: "Let's build GPT: from scratch, in code, spelled out", channel_title: "Andrej Karpathy", thumbnail: "https://img.youtube.com/vi/kCc8FmEb1nY/hqdefault.jpg", published_at: new Date(Date.now() - 10 * 86400000).toISOString(), view_count: 3400000 },
  { id: "AhyznRSDjw8", title: "The AI Startup Playbook — YC W25 Batch", channel_title: "Y Combinator", thumbnail: "https://img.youtube.com/vi/AhyznRSDjw8/hqdefault.jpg", published_at: new Date(Date.now() - 5 * 86400000).toISOString(), view_count: 450000 },
  { id: "zjkBMFhNj_g", title: "GPT in 60 Lines of NumPy", channel_title: "Fireship", thumbnail: "https://img.youtube.com/vi/zjkBMFhNj_g/hqdefault.jpg", published_at: new Date(Date.now() - 7 * 86400000).toISOString(), view_count: 920000 },
  { id: "pY56HbyEl1A", title: "Runway Gen-3 Alpha Is Mind-Blowing", channel_title: "Fireship", thumbnail: "https://img.youtube.com/vi/pY56HbyEl1A/hqdefault.jpg", published_at: new Date(Date.now() - 3 * 86400000).toISOString(), view_count: 680000 },
  { id: "L_Guz73e6fw", title: "State of AI Agents in 2025", channel_title: "Y Combinator", thumbnail: "https://img.youtube.com/vi/L_Guz73e6fw/hqdefault.jpg", published_at: new Date(Date.now() - 14 * 86400000).toISOString(), view_count: 230000 },
];

const formatCount = (n) => {
  if (!n) return "0";
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
};

const timeAgo = (dateStr) => {
  if (!dateStr) return "";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
};

function ChannelPill({ ch, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[12px] font-medium whitespace-nowrap border transition-all shrink-0 ${
        active
          ? "bg-[#7c3aed] text-white border-[#7c3aed] shadow-[0_0_12px_rgba(124,58,237,0.3)]"
          : "bg-[#111] text-[#737373] border-[#262626] hover:border-[#7c3aed]/50 hover:text-[#a3a3a3]"
      }`}
    >
      {ch.thumbnail && <img src={ch.thumbnail} alt="" className="w-5 h-5 rounded-full" onError={(e) => { e.target.style.display = "none"; }} />}
      <span>{ch.name}</span>
      {ch.subscriber_count > 0 && (
        <span className={`text-[10px] font-mono ${active ? "text-white/70" : "text-[#404040]"}`}>{formatCount(ch.subscriber_count)}</span>
      )}
    </button>
  );
}

export default function VideoNews() {
  const [channels, setChannels] = useState(MOCK_CHANNELS);
  const [videos, setVideos] = useState(MOCK_VIDEOS);
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("videos");
  const [usingMock, setUsingMock] = useState(true);

  const fetchContent = useCallback(async (channelId) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/youtube/videos?channel_id=${channelId}&max_results=12`, { signal: AbortSignal.timeout(4000) });
      const data = await res.json();
      if (data.videos?.length > 0) { setVideos(data.videos); setUsingMock(false); }
      else { setVideos(MOCK_VIDEOS); setUsingMock(true); }
    } catch {
      setVideos(MOCK_VIDEOS); setUsingMock(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchContent(selectedChannel); }, [selectedChannel, fetchContent]);

  useEffect(() => {
    fetch(`${API_BASE}/api/youtube/channels`, { signal: AbortSignal.timeout(4000) })
      .then(r => r.json())
      .then(d => { if (d.channels?.length) setChannels(d.channels); })
      .catch(() => {});
  }, []);

  const totalSubs = channels.reduce((a, c) => a + (c.subscriber_count || 0), 0);

  return (
    <div data-testid="video-news-page" className="min-h-screen bg-[#080808] pb-24">

      {/* Banner */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] pt-5 pb-4 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #7c3aed 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7c3aed]/20 border border-[#7c3aed]/30 rounded-lg flex items-center justify-center">
                <Video size={20} className="text-[#7c3aed]" />
              </div>
              <div>
                <h1 className="text-[16px] font-bold text-[#f0f0f0] flex items-center gap-2">
                  Video AI
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7c3aed] opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#7c3aed]" />
                  </span>
                </h1>
                <div className="flex items-center gap-3 text-[11px] text-[#404040]">
                  <span>{channels.length} channels</span>
                  <span>{formatCount(totalSubs)} subscribers</span>
                  {usingMock && <span className="text-[#7c3aed]">· Demo content</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Channel pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
            <ChannelPill
              ch={{ id: "all", name: "All Channels", thumbnail: "", subscriber_count: 0 }}
              active={selectedChannel === "all"}
              onClick={() => setSelectedChannel("all")}
            />
            {channels.map(ch => (
              <ChannelPill key={ch.id} ch={ch} active={selectedChannel === ch.id} onClick={() => setSelectedChannel(ch.id)} />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-[#080808] border-b border-[#1a1a1a] sticky top-[84px] z-20">
        <div className="max-w-5xl mx-auto flex items-center px-4">
          {[
            { id: "videos", label: "Videos", icon: Play },
            { id: "channels", label: "Channels", icon: Users },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-4 py-3 text-[13px] font-medium border-b-2 transition-colors ${
                tab === t.id ? "border-[#7c3aed] text-[#7c3aed]" : "border-transparent text-[#404040] hover:text-[#737373]"
              }`}
            >
              <t.icon size={14} /> {t.label}
            </button>
          ))}
          <div className="ml-auto">
            <button
              onClick={() => fetchContent(selectedChannel)}
              disabled={loading}
              className="p-2 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-5">

        {usingMock && (
          <div className="mb-4 px-3 py-2 bg-[#7c3aed]/10 border border-[#7c3aed]/20 rounded-lg">
            <span className="text-[11px] text-[#a78bfa]">✦ Demo content — connect backend to load live AI video channels.</span>
          </div>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-8 h-8 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin" />
            <p className="text-[13px] text-[#404040]">Loading AI videos…</p>
          </div>
        )}

        {!loading && tab === "videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {videos.map(video => (
              <div
                key={video.id}
                className="bg-[#0d0d0d] rounded-xl overflow-hidden border border-[#1f1f1f] cursor-pointer group hover:border-[#7c3aed]/40 hover:shadow-[0_4px_24px_rgba(124,58,237,0.1)] transition-all"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 brightness-75 group-hover:brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 bg-[#7c3aed]/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(124,58,237,0.5)]">
                      <Play size={18} className="text-white ml-0.5" fill="white" />
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="font-semibold text-[13px] text-[#e5e5e5] group-hover:text-white line-clamp-2 leading-snug transition-colors">{video.title}</h4>
                  <div className="flex items-center justify-between mt-2 text-[11px] text-[#404040]">
                    <span className="truncate">{video.channel_title}</span>
                    <span className="shrink-0 flex items-center gap-1 ml-2"><Clock size={10} />{timeAgo(video.published_at)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && tab === "channels" && (
          <div className="space-y-2">
            <p className="text-[12px] text-[#404040] mb-4">{channels.length} channels · {formatCount(totalSubs)} total subscribers</p>
            {channels.map((ch, i) => (
              <button
                key={ch.id}
                className="flex items-center gap-3 p-4 w-full text-left bg-[#0d0d0d] rounded-xl border border-[#1f1f1f] hover:border-[#7c3aed]/40 transition-all group"
                onClick={() => { setSelectedChannel(ch.id); setTab("videos"); }}
              >
                <span className="text-[11px] font-mono text-[#333] w-5 text-right">{i + 1}</span>
                <img
                  src={ch.thumbnail}
                  alt={ch.name}
                  className="w-11 h-11 rounded-full border border-[#262626]"
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${ch.name}&background=7c3aed&color=fff`; }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[13px] text-[#e5e5e5] group-hover:text-white truncate transition-colors">{ch.name}</h3>
                  <div className="flex items-center gap-3 text-[11px] text-[#404040] mt-0.5">
                    <span>{formatCount(ch.subscriber_count)} subs</span>
                    <span>{formatCount(ch.video_count)} videos</span>
                    <span>{formatCount(ch.view_count)} views</span>
                  </div>
                </div>
                <ChevronRight size={16} className="text-[#333] group-hover:text-[#7c3aed] transition-colors shrink-0" />
              </button>
            ))}
          </div>
        )}

        {!loading && tab === "videos" && videos.length === 0 && (
          <div className="text-center py-16">
            <div className="w-14 h-14 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center mx-auto mb-4">
              <Youtube size={24} className="text-[#7c3aed]" />
            </div>
            <p className="text-[#404040] text-[13px]">No videos found</p>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-3 px-1">
              <h3 className="text-[14px] font-semibold text-[#f0f0f0] line-clamp-1">{selectedVideo.title}</h3>
              <button
                className="p-1.5 rounded-md text-[#737373] hover:text-[#f0f0f0] hover:bg-[#1a1a1a] transition-colors"
                onClick={() => setSelectedVideo(null)}
              >
                ✕
              </button>
            </div>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              className="w-full aspect-video rounded-xl border border-[#1f1f1f]"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
}

export { VideoNews };
