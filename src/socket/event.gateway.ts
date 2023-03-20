import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import {
  InMemoryDBService,
  InMemoryDBEntity,
} from '@nestjs-addons/in-memory-db';

// const screenId = '';

interface QueueEntity extends InMemoryDBEntity {
  queueId: number;
  noAntrian: string;
  groupCounter: string;
  noCounter: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway {
  constructor(
    private readonly queueService: InMemoryDBService<QueueEntity>,
  ) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('events')
  findAll(
    @MessageBody() data: any,
  ): Observable<WsResponse<number>> {
    console.log(data);
    return from([1, 2, 3]).pipe(
      map((item) => ({
        event: 'events',
        data: item,
      })),
    );
  }

  @SubscribeMessage('identity')
  async identity(
    @MessageBody() data: number,
  ): Promise<number> {
    return data;
  }

  @SubscribeMessage('sentData')
  async sentData(
    @MessageBody() data: object,
  ): Promise<object> {
    // console.log(data);
    return {
      msg: 'sent dari server',
    };
  }

  @SubscribeMessage('storeScreenInfo')
  async storeScreenInfo(
    @MessageBody() data: object,
  ): Promise<any> {
    const screenId = data;
    console.log(screenId);
  }

  @SubscribeMessage('pingClient')
  async pingClient(
    @MessageBody() data: object,
  ): Promise<any> {
    const existQueue = this.queueService.query(
      (record) => record.queueId === data['id'],
    );
    // console.log(existQueue);
    if (existQueue.length < 1) {
      this.queueService.create({
        queueId: data['id'],
        noAntrian: data['noAntrian'],
        groupCounter: data['groupCounter'],
        noCounter: data['noCounter'],
      });
    }
    const queues = this.queueService.getAll();
    // const newQuest = queues;
    if (queues.length > 4) {
      const deleteQueID = queues.at(1);
      this.queueService.delete(deleteQueID.id);
    }
    this.server.sockets.emit('pingServer', {
      data,
      queues,
    });
  }
  // @SubscribeMessage('pingServer')
  // async pingServer(): Promise<object> {
  //   // console.log(data);
  //   return {
  //     msg: 'ping dari server',
  //   };
  // }
}
