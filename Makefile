build:
	docker build -t bulk-sms -f docker/Dockerfile .


start: stop
	docker run -d -p 8081:6000 -p 8080:6000 --name bulk-sms bulk-sms

stop:
	docker rm -fv bulk-sms ||:

tail_logs:
	docker logs --follow bulk-sms

exec:
	docker exec -it bulk-sms bash

redis:
	docker exec -it bulk-sms redis-cli
