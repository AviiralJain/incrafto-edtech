import { BellRing, Lock, Settings, Users2 } from 'lucide-react'

import { AdminCard } from '../../admin/_components/stats-card'

export default function SettingsPage() {
	return (
		<div className="space-y-8">
			<section className="relative overflow-hidden rounded-4xl bg-linear-to-r from-[#2563eb] via-[#4f46e5] to-[#7c3aed] p-10 text-white mb-8" style={{ borderRadius: '36px' }}>
				<div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-2xl" />
				<p className="bg-white/20 w-fit px-4 py-2 rounded-full text-sm">Settings</p>
				<h1 className="text-6xl font-black mt-6 leading-tight">Admin configuration</h1>
				<p className="text-xl text-blue-100 mt-4 max-w-2xl">
					Configure permissions, notifications, and platform preferences.
				</p>
			</section>

			<div className="grid gap-6 xl:grid-cols-2">
				<AdminCard className="p-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="rounded-2xl bg-linear-to-r from-blue-500 to-cyan-500 p-3 text-white">
								<Settings className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-gray-900">General settings</h2>
							<p className="mt-1 text-gray-500">Institute and branding preferences.</p>
						</div>
					</div>
					<div className="space-y-4">
						<label className="block space-y-2 text-sm font-medium text-slate-700">
							<span>Institute name</span>
							<input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-300" defaultValue="InCrafto" />
						</label>
						<label className="block space-y-2 text-sm font-medium text-slate-700">
							<span>Support email</span>
							<input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-300" defaultValue="support@incrafto.com" />
						</label>
						<label className="block space-y-2 text-sm font-medium text-slate-700">
							<span>Timezone</span>
							<input className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-sky-300" defaultValue="Asia/Kolkata" />
						</label>
					</div>
				</AdminCard>

				<AdminCard className="p-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="rounded-2xl bg-linear-to-r from-green-500 to-emerald-500 p-3 text-white">
								<BellRing className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-gray-900">Notification rules</h2>
							<p className="mt-1 text-gray-500">Where admin alerts are delivered.</p>
						</div>
					</div>
					<div className="space-y-4">
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4 text-sm text-gray-700">
							Email alerts for approvals and certificate status changes.
						</div>
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4 text-sm text-gray-700">
							Slack integration for placement updates and urgent notices.
						</div>
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4 text-sm text-gray-700">
							SMS escalation for critical student support cases.
						</div>
					</div>
				</AdminCard>

				<AdminCard className="p-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="rounded-2xl bg-linear-to-r from-purple-500 to-pink-500 p-3 text-white">
								<Lock className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-gray-900">Security</h2>
							<p className="mt-1 text-gray-500">Protect administrative access.</p>
						</div>
					</div>
					<div className="space-y-4 text-sm text-gray-700">
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4">Two-factor authentication required for all admins.</div>
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4">Password rotation every 90 days.</div>
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4">Audit logs retained for 365 days.</div>
					</div>
				</AdminCard>

				<AdminCard className="p-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="rounded-2xl bg-linear-to-r from-orange-500 to-red-500 p-3 text-white">
								<Users2 className="h-5 w-5" />
						</div>
						<div>
							<h2 className="text-3xl font-bold text-gray-900">Roles and access</h2>
							<p className="mt-1 text-gray-500">Permission boundaries for staff members.</p>
						</div>
					</div>
					<div className="space-y-4 text-sm text-gray-700">
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4">Super admins manage all modules.</div>
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4">Academic coordinators manage batches and approvals.</div>
						<div className="rounded-2xl bg-linear-to-r from-slate-50 to-purple-50 p-4">Placement officers manage recruiter interactions.</div>
					</div>
				</AdminCard>
			</div>
		</div>
	)
}

