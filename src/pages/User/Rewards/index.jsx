// pages/User/Rewards/index.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import {
  Gift,
  Sparkles,
  Copy,
  Check,
  Share2,
  Tag,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";
import { api } from "../../../context/DataContext";

import PageHeader from "../../../components/ui/PageHeader";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import { FullPageSpinner } from "../../../components/ui/Spinner";

const Rewards = () => {
  const { user, isLoaded } = useUser();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [referralInput, setReferralInput] = useState("");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!isLoaded || !user?.id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/api/users/${user.id}/rewards`);
        setData(res.data);
      } catch (error) {
        console.error("Error loading rewards:", error);
        toast.error("Failed to load rewards");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [isLoaded, user?.id]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy code");
    }
  };

  const handleShare = async () => {
    const text = `Shop with me on ShopSphere and get rewards! Use my referral code ${data.referralCode} for exclusive perks. Shop now!`;
    const url = window.location.origin;
    if (navigator.share) {
      try {
        await navigator.share({ title: "ShopSphere Referral", text: `${text} ${url}` });
        return;
      } catch {
        // fall through to WhatsApp
      }
    }
    window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  };

  const handleApplyReferral = async (e) => {
    e.preventDefault();
    if (!referralInput.trim()) return;
    setApplying(true);
    try {
      const res = await api.post(`/api/users/${user.id}/referral`, { code: referralInput });
      toast.success(res.data.message || "Referral code applied!");
      setData((prev) => ({ ...prev, referredBy: referralInput.trim().toUpperCase() }));
      setReferralInput("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not apply referral code");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-background flex items-center justify-center">
        <FullPageSpinner label="Loading rewards..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="border-b border-border bg-surface-alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <PageHeader
            icon={Gift}
            title="Rewards & Referrals"
            description="Earn points on every order and get rewarded for sharing ShopSphere"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Points Balance */}
          <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-brand-soft text-brand-600 dark:text-brand-400">
                <Sparkles size={24} aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-foreground">Your Points</h2>
            </div>
            <div className="p-5 rounded-xl bg-gradient-to-r from-brand-600 to-brand-500 text-white mb-4">
              <p className="text-sm text-white/80 mb-1">Available Balance</p>
              <p className="text-4xl font-black mb-1">{data?.rewardPoints ?? 0} pts</p>
              <p className="text-white/80 text-sm">= ₹{(data?.rewardPoints ?? 0) * 1}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl border border-border bg-surface-alt">
                <p className="text-xs text-text-muted mb-1">Lifetime Earned</p>
                <p className="text-xl font-extrabold text-foreground">{data?.totalPointsEarned ?? 0}</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-surface-alt">
                <p className="text-xs text-text-muted mb-1">Orders Placed</p>
                <p className="text-xl font-extrabold text-foreground">{data?.totalOrders ?? 0}</p>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-info-soft border border-info/20 text-sm text-foreground/90">
              <p className="font-bold text-info mb-1">How it works</p>
              <p>Earn <strong>1 point per ₹10</strong> spent. Redeem points at checkout — 1 point = ₹1.</p>
            </div>
          </div>

          {/* Referral */}
          <div className="rounded-2xl border border-border bg-surface shadow-card p-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex items-center justify-center w-12 h-12 rounded-xl bg-danger-soft text-danger">
                <Share2 size={24} aria-hidden />
              </span>
              <h2 className="text-xl font-bold text-foreground">Refer &amp; Earn</h2>
            </div>

            <p className="text-sm text-text-muted mb-4">
              Share your code with friends. When they place their first order, you both get <strong className="text-foreground">100 points</strong>.
            </p>

            <div className="flex items-center gap-2 rounded-xl border border-dashed border-brand-500/40 bg-brand-soft px-4 py-3 mb-4">
              <span className="flex-1 font-mono text-lg font-black tracking-widest text-brand-600 dark:text-brand-400">
                {data?.referralCode}
              </span>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-brand-600 text-white hover:bg-brand-700 transition-colors"
                aria-label="Copy referral code"
              >
                {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
              </button>
            </div>

            <Button variant="secondary" className="w-full justify-center mb-6" onClick={handleShare}>
              <Share2 size={16} aria-hidden />
              Share Referral Link
            </Button>

            <div className="border-t border-border pt-5">
              <p className="text-sm font-bold text-foreground mb-2">
                {data?.referredBy ? "Referral applied" : "Have a referral code?"}
              </p>
              {data?.referredBy ? (
                <p className="text-sm text-success font-semibold">
                  You used code {data.referredBy}. Earn 100 points on your first order!
                </p>
              ) : (
                <form onSubmit={handleApplyReferral} className="flex gap-2">
                  <Input
                    type="text"
                    value={referralInput}
                    onChange={(e) => setReferralInput(e.target.value)}
                    placeholder="Enter referral code"
                    className="flex-1"
                  />
                  <Button type="submit" loading={applying} disabled={applying}>
                    <Tag size={15} aria-hidden />
                    Apply
                  </Button>
                </form>
              )}
            </div>

            <div className="mt-5 p-4 rounded-xl bg-surface-alt border border-border text-sm text-text-muted">
              <p className="flex items-center gap-1.5 font-bold text-foreground mb-1">
                <ShoppingBag size={14} aria-hidden />
                Tip
              </p>
              Redeem points at checkout to save on every order.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
