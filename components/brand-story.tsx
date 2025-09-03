export default function BrandStory() {
  return (
    <section className="relative z-10 py-24 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-8 md:gap-12">
          {/* Main Philosophy Card */}
          <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-2xl md:text-3xl font-light text-white mb-6 text-center">
              The Freedom to Live with <span className="font-medium text-[#52B9CA]">Clarity</span>
            </h2>
            <p className="text-white/90 leading-relaxed text-center max-w-3xl mx-auto">
              Taya stands for something deeply personal: the freedom to live with clarity and presence, without ever
              choosing between style and substance.
            </p>
          </div>

          {/* Value Props Glass Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="backdrop-blur-md bg-gradient-to-br from-[#52B9CA]/20 to-[#076B8B]/20 border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#52B9CA] to-[#076B8B] mb-4 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Seamless</h3>
              <p className="text-white/80 text-sm">Technology that integrates so naturally, you forget it's there</p>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-br from-[#9CCBD3]/20 to-[#52B9CA]/20 border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#9CCBD3] to-[#52B9CA] mb-4 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Elegant</h3>
              <p className="text-white/80 text-sm">Beautiful design that enhances your personal style</p>
            </div>

            <div className="backdrop-blur-md bg-gradient-to-br from-[#FFF6DC]/20 to-[#9CCBD3]/20 border border-white/20 rounded-2xl p-6 shadow-xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF6DC] to-[#9CCBD3] mb-4 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-white/30"></div>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">Intelligent</h3>
              <p className="text-white/80 text-sm">Smart features that adapt to your life and preferences</p>
            </div>
          </div>

          {/* Final Statement Card */}
          <div className="backdrop-blur-md bg-gradient-to-r from-[#0D2951]/30 to-[#076B8B]/30 border border-white/20 rounded-3xl p-8 shadow-2xl text-center">
            <p className="text-lg text-[#52B9CA] font-medium mb-4">
              "It's not another device. It's jewelry that thinks."
            </p>
            <p className="text-white/80 text-sm">
              Not flashy. Not intrusive. Just present, graceful, and transformative.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
