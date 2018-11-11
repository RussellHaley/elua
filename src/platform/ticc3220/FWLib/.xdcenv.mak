#
_XDCBUILDCOUNT = 
ifneq (,$(findstring path,$(_USEXDCENV_)))
override XDCPATH = /vagrant/SDK_Q3_GA_17_9_18/sdk_root/source;/vagrant/SDK_Q3_GA_17_9_18/sdk_root/kernel/tirtos/packages
override XDCROOT = /opt/ti/xdctools_3_50_08_24_core
override XDCBUILDCFG = /vagrant/SDK_Q3_GA_17_9_18/sdk_root/kernel/tirtos/packages/coresdk.bld
endif
ifneq (,$(findstring args,$(_USEXDCENV_)))
override XDCARGS = ti.targets.arm.elf.M4="/opt/ti/ccs-latest/ccsv8/tools/compiler/ti-cgt-arm_18.1.3.LTS" gnu.targets.arm.M4="/opt/ti/ccs-latest/ccsv8/tools/compiler/gcc-arm-none-eabi-7-2017-q4-major" iar.targets.arm.M4="/opt/iar/arm/latest" CC32XXWARE=/vagrant/SDK_Q3_GA_17_9_18/sdk_root
override XDCTARGETS = 
endif
#
ifeq (0,1)
PKGPATH = /vagrant/SDK_Q3_GA_17_9_18/sdk_root/source;/vagrant/SDK_Q3_GA_17_9_18/sdk_root/kernel/tirtos/packages;/opt/ti/xdctools_3_50_08_24_core/packages;../..
HOSTOS = Linux
endif
