from pyudev import Context, MonitorObserver, Monitor


def print_device_event(device):
    print('background event {0.action}: {0.device_path}'.format(device))


context = Context()
monitor = Monitor.from_netlink(context)
observer = MonitorObserver(
    monitor, callback=print_device_event, name='monitor-observer')
observer.daemon
observer.start()
